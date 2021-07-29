import React from "react";
import Avatar from "../avatar/Avatar";
import { showFileVideo, showFileImage } from "../../utils/showFileMedia";

const MessageDisplay = ({ user, msg }) => {
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
      {msg.text && <div className="chat__text">{msg.text}</div>}
      {msg.media.map((item, index) => (
        <div className="chat__text-media-file" key={index}>
          {item.url.match(/video/i)
            ? showFileVideo(item.url)
            : showFileImage(item.url)}
        </div>
      ))}
      <div className="chat__time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  );
};

export default MessageDisplay;
