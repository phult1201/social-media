import React from "react";
import CommentCard from "./CommentCard";

const CommentDisplay = ({ comment, post, replyCm }) => {
  return (
    <div className="comment-display">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div>
          {replyCm.map(
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
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
