import React from "react";
import FollowBtn from "./FollowBtn";
import { useSelector } from "react-redux";
import UserCard from "../../header/UserCard";
import Overlay from "../../overlay/Overlay";
import { Link } from "react-router-dom";

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
              <Link
                to={`/profile/${user._id}`}
                onClick={() => setShowFollowing(false)}
              >
                <UserCard user={user} />
              </Link>
              {auth.user._id !== user._id && <FollowBtn user={user} />}
            </div>
          ))}
        </div>
      </div>
    </Overlay>
  );
};

export default Following;
