import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

const CommentDisplay = ({ comment, post, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);
  return (
    <div className="comment-display">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div style={{ marginLeft: "40px", marginTop: "4px" }}>
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentCard
                  comment={item}
                  key={index}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}
          {replyCm.length - next > 0 ? (
            <div
              style={{
                cursor: "pointer",
                fontSize: "1.4rem",
                marginBottom: "4px",
              }}
              onClick={() => setNext(next + 10)}
            >
              See more comments...
            </div>
          ) : (
            replyCm.length > 1 && (
              <div
                style={{
                  cursor: "pointer",
                  fontSize: "1.4rem",
                  marginBottom: "4px",
                }}
                onClick={() => setNext(1)}
              >
                Hide comments
              </div>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
