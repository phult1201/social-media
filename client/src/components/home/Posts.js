import React from "react";
import { useSelector } from "react-redux";
import CardBody from "./post_card/CardBody";
import CardHeader from "./post_card/CardHeader";
import CardFooter from "./post_card/CardFooter";
import Comments from "./comment_card/Comments";
import InputComment from "./comment_card/InputComment";
import Loading from "../alert/Loading";

const Posts = () => {
  const { homePosts } = useSelector((state) => state);
  if (!homePosts) return <Loading />;

  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <div key={post._id} className="posts-item">
          <CardHeader post={post} />
          <CardBody post={post} />
          <CardFooter post={post} />

          <Comments post={post} />
          <InputComment post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
