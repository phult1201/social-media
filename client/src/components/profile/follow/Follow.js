import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../../../redux/actions/profileAction";

const Follow = ({ user }) => {
  const distpatch = useDispatch();
  const { auth, profile } = useSelector((state) => state);
  const [followed, setFollowed] = useState(false);

  const handleFollow = () => {
    setFollowed(true);
    distpatch(follow({ users: profile.users, user, auth }));
  };

  const handleUnFollow = () => {
    setFollowed(false);
    distpatch(unfollow({ users: profile.users, user, auth }));
  };

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id))
      setFollowed(true);
  }, [auth.user.following, user._id]);

  return (
    <>
      {followed ? (
        <button
          className="follow-btn follow-btn--true"
          onClick={handleUnFollow}
        >
          Unfollow
        </button>
      ) : (
        <button className="follow-btn follow-btn--false" onClick={handleFollow}>
          Follow
        </button>
      )}
    </>
  );
};

export default Follow;
