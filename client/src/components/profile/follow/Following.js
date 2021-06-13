import React from "react";
import FollowBtn from "./FollowBtn";
import { useSelector } from "react-redux";
import UserCard from "../../header/UserCard";
import Overlay from "../../overlay/Overlay";

const Following = ({ users, setShowFollowing }) => {
  const { auth } = useSelector((state) => state);
  return (
    <Overlay>
      <div className="follow">
        <div className="follow_header">
          <h5 className="follow_header-title">Follwers</h5>
          <button
            className="follow_header-btn"
            onClick={() => setShowFollowing(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="follow_body">
          {users.map((user) => (
            <div key={user._id} className="follow_body-item">
              <UserCard user={user}>
                {auth.user._id !== user._id && <FollowBtn user={user} />}
              </UserCard>
            </div>
          ))}
        </div>
      </div>
    </Overlay>
  );
};

export default Following;
