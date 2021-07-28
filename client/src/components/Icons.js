import React, { useState } from "react";

const Icons = ({ content, setContent, inputRef }) => {
  const [showModal, setShowModal] = useState(false);
  const emoji = [
    "🙂",
    "😀",
    "😄",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😌",
    "😉",
    "😏",
    "😍",
    "😘",
    "😗",
    "😙",
    "😚",
    "🙃",
    "😳",
    "🤗",
    "😇",
    "😈",
    "😛",
    "😝",
    "😡",
    "😠",
    "😜",
    "😋",
    "🤤",
    "🤓",
    "😎",
    "🤢",
    "❣️",
    "👍",
  ];
  return (
    <div className="icons">
      <span
        style={{ fontSize: "1.6rem", opacity: "0.8" }}
        onClick={() => setShowModal(!showModal)}
      >
        🙂
      </span>

      {showModal && (
        <div className="icons__modal">
          <ul className="icons__list">
            {emoji.map((item, index) => (
              <li
                key={index}
                className="icons__list-item"
                onClick={() => {
                  setContent(content + item);
                  inputRef.current.setSelectionRange(
                    content.length + 1,
                    content.length + 1
                  );
                  inputRef.current.focus();
                  inputRef.current.select();
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Icons;
