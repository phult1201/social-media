import React, { useState, useEffect } from "react";
import CommentDisplay from "./CommentDisplay";

const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);

  useEffect(() => {
    const newCm = post.comments.filter((cm) => {
      return !cm.reply;
    });
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post.comments, next]);

  return (
    <div className="comments">
      {showComments.map((comment) => (
        <CommentDisplay key={comment._id} comment={comment} post={post} />
      ))}
      {comments.length - next > 0 ? (
        <div onClick={() => setNext(next + 10)}>See more comments...</div>
      ) : (
        comments.length > 2 && (
          <div onClick={() => setNext(2)}>Hide comments</div>
        )
      )}
    </div>
  );
};

export default Comments;
