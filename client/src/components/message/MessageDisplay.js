import React from "react";
import Avatar from "../avatar/Avatar";
import { showFileVideo, showFileImage } from "../../utils/showFileMedia";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessages } from "../../redux/actions/messageAction";

const MessageDisplay = ({ user, msg, data }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteMessages = (e) => {
    if (data) {
      dispatch(deleteMessages({ msg, data, auth }));
    }
  };
  return (
    <>
      <div className="chat__avatar">
        <Avatar
          avaImg={user.avatar}
          avaSize="small"
          avaName="true"
          firstName={user.firstname}
          lastName={user.lastname}
        />
      </div>
      <div className="">
        {user._id === auth.user._id && (
          <i
            className="fas fa-trash"
            style={{ color: "crimson" }}
            onClick={handleDeleteMessages}
          />
        )}
        <div>
          {msg.text && <div className="chat__text">{msg.text}</div>}
          {msg.media.map((item, index) => (
            <div className="chat__text-media-file" key={index}>
              {item.url.match(/video/i)
                ? showFileVideo(item.url)
                : showFileImage(item.url)}
            </div>
          ))}
        </div>
      </div>
      <div className="chat__time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  );
};

export default MessageDisplay;
