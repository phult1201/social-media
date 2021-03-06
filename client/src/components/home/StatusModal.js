import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/constant";
import { createPost, updatePost } from "../../redux/actions/postAction";
import Overlay from "../overlay/Overlay";
import Icons from "../Icons";
import { showFileImage, showFileVideo } from "../../utils/showFileMedia";

const StatusModal = () => {
  const { auth, status, socket } = useSelector((state) => state);

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const videoRef = useRef();
  const refCanvas = useRef();

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exists.");

      if (file.size > 1024 * 1024 * 50)
        return (err = "The file largest is 50 MB.");

      return newImages.push(file);
    });
    if (err)
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });

    setImages([...images, ...newImages]);
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCloseStream = () => {
    tracks.stop();
    setStream(false);
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!images.length)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please add your photo" },
      });

    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }));
    } else {
      dispatch(createPost({ content, images, auth, socket }));
    }

    setContent("");
    setImages([]);
    if (tracks) tracks.stop();
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
  };

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content);
      setImages(status.images);
    }
  }, [status.content, status.onEdit, status.images]);

  return (
    <Overlay>
      <div className="status_modal">
        <form className="status_modal-form" onSubmit={handleSubmit}>
          <div className="status_modal-form-header">
            <h5>Create Post</h5>
            <i
              className="fas fa-times"
              onClick={() =>
                dispatch({ type: GLOBALTYPES.STATUS, payload: false })
              }
            />
          </div>

          <div className="status_modal-form-body">
            <textarea
              placeholder={`${auth.user.lastname}, what are you thinking`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              ref={inputRef}
            />
            <Icons
              content={content}
              setContent={setContent}
              inputRef={inputRef}
            />
            <div className="show_images">
              {images.map((image, index) => (
                <div key={index} className="show_images-box">
                  {image.camera ? (
                    showFileImage(image.camera)
                  ) : image.url ? (
                    <>
                      {image.url.match(/video/i)
                        ? showFileVideo(image.url)
                        : showFileImage(image.url)}
                    </>
                  ) : (
                    <>
                      {image.type.match(/video/i)
                        ? showFileVideo(URL.createObjectURL(image))
                        : showFileImage(URL.createObjectURL(image))}
                    </>
                  )}
                  <span onClick={() => handleDeleteImage(index)}>
                    <i className="fas fa-times"></i>
                  </span>
                </div>
              ))}
            </div>

            {stream && (
              <div
                className="stream"
                style={{ position: "relative", margin: "10px 0" }}
              >
                <video
                  src=""
                  autoPlay
                  muted
                  ref={videoRef}
                  width="100%"
                  height="100%"
                ></video>
                <span onClick={handleCloseStream}>
                  <i
                    className="fas fa-times"
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      color: "#555",
                      cursor: "pointer",
                      fontSize: "1.6rem",
                    }}
                  ></i>
                </span>

                <canvas ref={refCanvas} style={{ display: "none" }} />
              </div>
            )}

            <div className="upload">
              {stream ? (
                <i
                  className="fas fa-camera upload-camera"
                  onClick={handleCapture}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <>
                  <i
                    className="fas fa-camera upload-camera"
                    onClick={handleStream}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="upload-image">
                    <i className="fas fa-image" />
                    <input
                      type="file"
                      name="file"
                      id="file"
                      multiple
                      accept="image/*, video/*"
                      onChange={handleChangeImages}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="status_modal-form-footer">
            <button>Post</button>
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default StatusModal;
