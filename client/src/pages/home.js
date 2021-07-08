import React from "react";
import { useSelector } from "react-redux";
import Posts from "../components/home/Posts";
import Status from "../components/home/Status";

const Home = () => {
  const { homePosts } = useSelector((state) => state);

  return (
    <div className="home" style={{ display: "flex", flexDirection: "column" }}>
      <Status />

      {homePosts.result && <Posts />}
    </div>
  );
};

export default Home;
