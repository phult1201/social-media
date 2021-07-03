import React from "react";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import Comments from "../comment_card/Comments";
import InputComment from "../comment_card/InputComment";

const PostCard = ({ post }) => {
  return (
    <>
      <div key={post._id} className="posts-item">
        <CardHeader post={post} />
        <CardBody post={post} />
        <CardFooter post={post} />

        <Comments post={post} />
        <InputComment post={post} />
      </div>
    </>
  );
};

export default PostCard;
