import React from "react";
import LeftSide from "../../components/message/LeftSide";
import RightSide from "../../components/message/RightSide";

const Conversation = () => {
  return (
    <div className="message conversation">
      <LeftSide className="left-side" />

      <RightSide className="right-side" />
    </div>
  );
};

export default Conversation;
