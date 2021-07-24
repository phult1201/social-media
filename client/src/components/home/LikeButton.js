import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  return (
    <>
      {isLike && <AiFillLike onClick={handleUnLike} />}

      {!isLike && <AiOutlineLike onClick={handleLike} />}
    </>
  );
};

export default LikeButton;
