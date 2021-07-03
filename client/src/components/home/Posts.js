import React from "react";
import { useSelector } from "react-redux";
import PostCard from "./post_card/PostCard";
import Loading from "../alert/Loading";

const Posts = () => {
  const { homePosts } = useSelector((state) => state);
  if (!homePosts) return <Loading />;

  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
