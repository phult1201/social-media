import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../../redux/actions/commentAction";

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth, socket })).then(() => {
      if (setOnReply) return setOnReply(false);
      setContent("");
    });
  };
  return (
    <div className="input-comment">
      <form className="form-comment" onSubmit={handleSubmit}>
        {children}
        <input
          type="text"
          placeholder="Add your comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">
          <i className="fas fa-feather-alt"></i>
        </button>
      </form>
    </div>
  );
};

export default InputComment;
