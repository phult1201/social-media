import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileUser } from "../../redux/actions/profileAction";
import Loading from "../alert/Loading";
import EditProfile from "./EditProfile";
import Avatar from "../avatar/Avatar";
import Follow from "./follow/Follow";

const Infor = () => {
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      dispatch(getProfileUser({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [auth, id, dispatch, profile.users]);

  if (!userData) return <Loading />;

  return (
    <div className="infor">
      {userData.length > 0 &&
        userData.map((user) => (
          <div className="infor_container" key={user._id}>
            <div className="infor_container-avatar">
              <Avatar avaImg={user.avatar} avaSize="big" />
            </div>

            <div className="infor_container-content">
              <div className="infor_container-content-title">
                <h2>
                  {user.firstname} {user.lastname}
                </h2>
              </div>
              {user._id === auth.user._id ? (
                <button
                  className="follow-btn follow-btn--false"
                  onClick={() => setOnEdit(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <Follow user={user} />
              )}
              <div className="infor_container-content-follow">
                <span>{user.followers.length} Followers </span>
                <span>{user.following.length} Following </span>
              </div>
              <div className="infor_container-content-contact">
                <h2>Contact me</h2>
                <p>{user.address}</p>
                <p>{user.email}</p>
                <p>{user.mobile}</p>
                <a href={user.website}>{user.website}</a>
              </div>
            </div>

            {onEdit && <EditProfile setOnEdit={setOnEdit} />}
          </div>
        ))}
    </div>
  );
};

export default Infor;
