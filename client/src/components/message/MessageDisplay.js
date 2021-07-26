import React from "react";
import Avatar from "../avatar/Avatar";

const MessageDisplay = ({ user }) => {
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
      <div className="chat__text">
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with
      </div>
      <div className="chat__time">April 09</div>
    </>
  );
};

export default MessageDisplay;
