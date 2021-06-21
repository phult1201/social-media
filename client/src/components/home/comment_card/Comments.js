import React from "react";
import CommentDisplay from "./CommentDisplay";

const Comments = ({ post }) => {
  return (
    <div className="comments">
      {post.comments.map((comment) => (
        <CommentDisplay key={comment._id} comment={comment} post={post} />
      ))}
    </div>
  );
};

export default Comments;
