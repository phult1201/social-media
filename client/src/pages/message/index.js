import React from "react";
import LeftSide from "../../components/message/LeftSide";
import { FaFacebookMessenger } from "react-icons/fa";

const Message = () => {
  return (
    <div className="message">
      <LeftSide className="left-side" />

      <div className="right-side ">
        <div className="right-side_logo">
          <div>
            <FaFacebookMessenger />
          </div>
          <h4>Messenger</h4>
        </div>
      </div>
    </div>
  );
};

export default Message;
