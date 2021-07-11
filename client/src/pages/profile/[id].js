import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../components/alert/Loading";
import Infor from "../../components/profile/Infor";
import Posts from "../../components/profile/Posts";
import Saved from "../../components/profile/Saved";
import { getProfileUser } from "../../redux/actions/profileAction";

const Profile = () => {
  const [saveTab, setSaveTab] = useState(false);

  const { profile, auth } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUser({ id, auth }));
    }
  }, [profile.ids, id, auth, dispatch]);

  return (
    <div className="profile">
      <Infor auth={auth} profile={profile} dispatch={dispatch} id={id} />
      {auth.user._id === id && (
        <div className="profile_tab">
          <button
            className={saveTab ? "" : "active"}
            onClick={() => setSaveTab(false)}
          >
            Posts
          </button>
          <button
            className={saveTab ? "active" : ""}
            onClick={() => setSaveTab(true)}
          >
            Saved
          </button>
        </div>
      )}
      {profile.loading ? (
        <Loading />
      ) : saveTab ? (
        <Saved auth={auth} dispatch={dispatch} />
      ) : (
        // PostThumb in profile
        <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
      )}
    </div>
  );
};

export default Profile;
