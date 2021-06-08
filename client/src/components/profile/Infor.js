import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileUser } from "../../redux/actions/userAction";

const Infor = () => {
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      dispatch(getProfileUser({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [auth, id, dispatch, profile.users]);

  return (
    <div className="infor">
      {userData.length > 0 &&
        userData.map((user) => (
          <div className="infor_container" key={user._id}>
            <div className="infor_container-avatar">
              <img src={user.avatar} alt="avatar" />
            </div>

            <div className="infor_container-content">
              <div className="infor_container-content-title">
                <h2>
                  {user.firstname} {user.lastname}
                </h2>
              </div>
              <button className="infor_container-content-btn">
                Edit Profile
              </button>
              <div className="infor_container-content-follow">
                <span>{user.followers.length}-followers </span>
                <span>{user.following.length}-following </span>
              </div>
              <div className="infor_container-content-contact">
                <h2>Contact me</h2>
                <p>{user.email}</p>
                <p>{user.mobile}</p>
                <a href={user.website}>{user.website}</a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Infor;