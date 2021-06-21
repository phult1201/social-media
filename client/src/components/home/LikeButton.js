import React from "react";

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  return (
    <>
      {isLike ? (
        <i
          className="fas fa-heart"
          onClick={handleUnLike}
          style={{ cursor: "pointer" }}
        ></i>
      ) : (
        <i
          className="far fa-heart"
          onClick={handleLike}
          style={{ cursor: "pointer" }}
        ></i>
      )}
    </>
  );
};

export default LikeButton;
