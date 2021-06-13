import React from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/alert/Loading";
import Infor from "../../components/profile/Infor";
import Posts from "../../components/profile/Posts";

const Profile = () => {
  const { profile } = useSelector((state) => state);

  return (
    <div
      className="profile"
      style={{ position: "relative", height: "calc(100vh - 70px)" }}
    >
      {profile.loading ? <Loading /> : <Infor />}
      <Posts />
    </div>
  );
};

export default Profile;
