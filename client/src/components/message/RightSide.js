import React, { useEffect, useState } from "react";
import UserCard from "../header/UserCard";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FaTrash, FaFeatherAlt } from "react-icons/fa";
import MessageDisplay from "./MessageDisplay";

const RightSide = ({ className, style }) => {
  const { auth, message } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const newUser = message.users.find((item) => item._id === id);
    if (newUser) setUser(newUser);
  }, [id, message.users]);

  return (
    <div className={className} style={style}>
      <div className="conversation__header">
        <UserCard user={user} />
        <FaTrash style={{ color: "crimson" }} />
      </div>

      <div className="conversation__body">
        <div className="chat__display">
          <div className="chat__row chat-other__message">
            <MessageDisplay user={user} />
          </div>

          <div className="chat__row chat-auth__message">
            <MessageDisplay user={auth.user} />
          </div>
        </div>
      </div>

      <form className="conversation__footer">
        <input
          type="text"
          placeholder="Enter your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button disabled={!text && true}>
          <FaFeatherAlt />
        </button>
      </form>
    </div>
  );
};

export default RightSide;
