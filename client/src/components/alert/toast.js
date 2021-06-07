import React from "react";

const Toast = ({ msg, handleShow }) => {
  return (
    <div className={`toast`} style={{ borderLeftColor: `${msg.color}` }}>
      <span
        className="material-icons toast_icon"
        style={{ color: `${msg.color}` }}
      >
        {msg.icon}
      </span>
      <div className={`toast_header`}>
        <h3 className="toast_title" style={{ color: `${msg.color}` }}>
          {msg.title}
        </h3>
        <div className="toast_body">{msg.body}</div>
      </div>
      <span className="material-icons toast_close" onClick={handleShow}>
        clear
      </span>
    </div>
  );
};

export default Toast;
