import React from "react";
import { useSelector } from "react-redux";
import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import Loading from "../components/alert/Loading";

const Home = () => {
  const { homePosts } = useSelector((state) => state);

  return (
    <div className="home">
      <Status />
      {homePosts.loading ? (
        <Loading />
      ) : homePosts.result === 0 ? (
        <h2 style={{ textAlign: "center" }}>No Posts</h2>
      ) : (
        <Posts />
      )}
    </div>
  );
};

export default Home;
