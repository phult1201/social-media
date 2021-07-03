import React from "react";
import { useSelector } from "react-redux";
import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import Loading from "../components/alert/Loading";

const Home = () => {
  const { homePosts } = useSelector((state) => state);

  if (homePosts.loading) return <Loading />;

  return (
    <div className="home">
      <Status />

      {homePosts.result && <Posts />}
    </div>
  );
};

export default Home;
