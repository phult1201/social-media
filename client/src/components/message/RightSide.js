import React, { useEffect, useRef, useState } from "react";
import { FaFeatherAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  addMessage,
  deletConversation,
  getMessages,
  loadMoreMessages,
} from "../../redux/actions/messageAction";
import { GLOBALTYPES } from "../../redux/constant";
import { uploadImage } from "../../utils/imageUpload";
import { showFileImage, showFileVideo } from "../../utils/showFileMedia";
import UserCard from "../header/UserCard";
import Icons from "../Icons";
import LoadIcon from "../LoadIcon";
import MessageDisplay from "./MessageDisplay";

const RightSide = ({ className, style }) => {
  const { auth, message, socket } = useSelector((state) => state);

  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(0);

  const [data, setData] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const inputTextRef = useRef(null);
  const refDisplay = useRef(null);
  const pageEnd = useRef(null);

  // Add-user
  useEffect(() => {
    if (id && message.users.length > 0) {
      setTimeout(() => {
        refDisplay.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 50);
      const newUser = message.users.find((item) => item._id === id);
      if (newUser) setUser(newUser);
    }
  }, [id, message.users]);

  // Get-messages-data
  useEffect(() => {
    const getMessagesData = async () => {
      if (message.data.every((item) => item._id !== id)) {
        await dispatch(getMessages({ auth, id }));
        setTimeout(() => {
          refDisplay.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 50);
      }
    };
    getMessagesData();
  }, [auth, id, message.data, dispatch]);

  useEffect(() => {
    const newData = message.data.find((item) => item._id === id);
    if (newData) {
      setData(newData.messages);
      setResult(newData.result);
      setPage(newData.page);
    }
  }, [id, message.data]);

  // Load-more
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadMore((p) => p + 1);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (isLoadMore > 1) {
      if (result >= page * 9) {
        dispatch(loadMoreMessages({ auth, id, page: page + 1 }));
        setIsLoadMore(1);
      }
    }
    // eslint-disable-next-line
  }, [isLoadMore]);

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    e.target.value = null;
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
    await dispatch(addMessage({ msg, auth, socket }));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  const handleDeleteConversation = async () => {
    dispatch(deletConversation({ auth, id }));
    return history.push("/message");
  };

  return (
    <div className={className} style={style}>
      <div className="conversation__header">
        {user.length !== 0 && (
          <>
            <UserCard user={user} />
            <FaTrash
              style={{ color: "crimson", cursor: "pointer" }}
              onClick={handleDeleteConversation}
            />
          </>
        )}
      </div>

      <div
        className="conversation__body"
        style={{
          height: media.length ? "calc(100vh - 296px)" : "calc(100vh - 202px)",
        }}
      >
        <div className="chat__display" ref={refDisplay}>
          <button ref={pageEnd} style={{ marginTop: "-12px", opacity: "0" }}>
            Load More
          </button>
          {data.map((msg, index) => (
            <div className="" key={index}>
              {msg.sender !== auth.user._id && (
                <div className="chat__row chat-other__message">
                  <MessageDisplay user={user} msg={msg} />
                </div>
              )}
              {msg.sender === auth.user._id && (
                <div className="chat__row chat-auth__message">
                  <MessageDisplay user={auth.user} msg={msg} data={data} />
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
          ref={inputTextRef}
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

        <Icons content={text} setContent={setText} inputRef={inputTextRef} />

        <button disabled={!text && !media.length && true}>
          <FaFeatherAlt />
        </button>
      </form>
    </div>
  );
};

export default RightSide;
