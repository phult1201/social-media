import React, { useEffect, useState, useRef } from "react";
import UserCard from "../header/UserCard";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FaTrash, FaFeatherAlt } from "react-icons/fa";
import MessageDisplay from "./MessageDisplay";
import { GLOBALTYPES } from "../../redux/constant";
import Icons from "../Icons";
import { showFileVideo, showFileImage } from "../../utils/showFileMedia";
import { uploadImage } from "../../utils/imageUpload";
import { addMessage } from "../../redux/actions/messageAction";
import LoadIcon from "../LoadIcon";

const RightSide = ({ className, style }) => {
  const { auth, message, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const newUser = message.users.find((item) => item._id === id);
    if (newUser) setUser(newUser);
  }, [id, message.users]);

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exists.");

      if (file.size > 1024 * 1024 * 50)
        return (err = "The file largest is 50 MB.");

      return newMedia.push(file);
    });
    if (err)
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });

    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setText("");
    setMedia([]);
    setLoadMedia(true);
    let newArr = [];
    if (media.length > 0) newArr = await uploadImage(media);
    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };
    setLoadMedia(false);
    dispatch(addMessage({ msg, auth, socket }));
  };

  return (
    <div className={className} style={style}>
      <div className="conversation__header">
        {user.length !== 0 && (
          <>
            <UserCard user={user} />
            <FaTrash style={{ color: "crimson" }} />
          </>
        )}
      </div>

      <div
        className="conversation__body"
        style={{
          height: media.length ? "calc(100vh - 296px)" : "calc(100vh - 202px)",
        }}
      >
        <div className="chat__display">
          {message.data.map((msg, index) => (
            <div className="" key={index}>
              {msg.sender !== auth.user._id && (
                <div className="chat__row chat-other__message">
                  <MessageDisplay user={user} msg={msg} />
                </div>
              )}
              {msg.sender === auth.user._id && (
                <div className="chat__row chat-auth__message">
                  <MessageDisplay user={auth.user} msg={msg} />
                </div>
              )}
            </div>
          ))}
        </div>

        {loadMedia && (
          <div className="chat__row chat-auth__message">
            <LoadIcon />
          </div>
        )}
      </div>

      <div className="show__media">
        {media.map((item, index) => (
          <div className="show__media-item" key={index}>
            {item.type.match(/video/i)
              ? showFileVideo(URL.createObjectURL(item))
              : showFileImage(URL.createObjectURL(item))}
            <span onClick={() => handleDeleteMedia(index)}>&times;</span>
          </div>
        ))}
      </div>

      <form className="conversation__footer" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={inputRef}
        />

        <div className="conversation__footer__upload">
          <i className="fa fa-image" />
          <input
            multiple
            accept="image/*,video/*"
            type="file"
            onChange={handleChangeMedia}
            id="uploadFile"
          />
        </div>

        <Icons content={text} setContent={setText} inputRef={inputRef} />

        <button disabled={!text && !media.length && true}>
          <FaFeatherAlt />
        </button>
      </form>
    </div>
  );
};

export default RightSide;
