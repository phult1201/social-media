import React from "react";
import { useSelector } from "react-redux";
import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import RightSideBar from "../components/home/RightSideBar";

const Home = () => {
  const { homePosts } = useSelector((state) => state);

  return (
    <div className="home">
      <div className="home_main">
        <Status />
        {homePosts.result && <Posts />}
      </div>

      <div className="home_right">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
