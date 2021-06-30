import React, { useState, useEffect } from "react";
import CommentDisplay from "./CommentDisplay";

const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);
  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const newCm = post.comments.filter((cm) => {
      return !cm.reply;
    });
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post.comments, next]);

  useEffect(() => {
    const newRep = post.comments.filter((cm) => cm.reply);
    setReplyComments(newRep);
  }, [post.comments]);
  return (
    <div className="comments">
      {showComments.map((comment) => (
        <CommentDisplay
          key={comment._id}
          comment={comment}
          post={post}
          replyCm={replyComments.filter((item) => item.reply === comment._id)}
        />
      ))}
      {comments.length - next > 0 ? (
        <div
          style={{ cursor: "pointer", fontSize: "1.4rem", marginBottom: "4px" }}
          onClick={() => setNext(next + 10)}
        >
          See more comments...
        </div>
      ) : (
        comments.length > 2 && (
          <div
            style={{
              cursor: "pointer",
              fontSize: "1.4rem",
              marginBottom: "4px",
            }}
            onClick={() => setNext(2)}
          >
            Hide comments
          </div>
        )
      )}
    </div>
  );
};

export default Comments;
