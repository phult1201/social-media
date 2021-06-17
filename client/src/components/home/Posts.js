import React from "react";
import { useSelector } from "react-redux";
import CardBody from "./post_card/CardBody";
import CardHeader from "./post_card/CardHeader";
import CardFooter from "./post_card/CardFooter";

const Posts = () => {
  const { homePosts } = useSelector((state) => state);
  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <div key={post._id} className="posts-item">
          <CardHeader post={post} />
          <CardBody post={post} />
          <CardFooter post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
