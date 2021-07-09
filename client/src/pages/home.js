import React from "react";
import { useSelector } from "react-redux";
import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import RightSideBar from "../components/home/RightSideBar";

const Home = () => {
  const { homePosts } = useSelector((state) => state);

  return (
    <div
      className="home"
      style={{
        display: "grid",
        gridTemplateColumns:
          "[col1-start] 20% [col1-end col2-start] auto [col2-end col3-start] 20% [col3-end]",
      }}
    >
      <div
        className="home_main"
        style={{ gridColumnStart: "col2-start", gridColumnEnd: "col2-end" }}
      >
        <Status />

        {homePosts.result && <Posts />}
      </div>

      <div
        className="home_right"
        style={{ gridColumnStart: "col3-start", gridColumnEnd: "col3-end" }}
      >
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
