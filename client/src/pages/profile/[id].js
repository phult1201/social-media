import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../components/alert/Loading";
import Infor from "../../components/profile/Infor";
import Posts from "../../components/profile/Posts";
import { getProfileUser } from "../../redux/actions/profileAction";

const Profile = () => {
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

      {profile.loading ? (
        <Loading />
      ) : (
        // PostThumb in profile
        <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
      )}
    </div>
  );
};

export default Profile;
