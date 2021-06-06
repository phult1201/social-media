import React from "react";

const UserCard = ({ user, border }) => {
  return (
    <div className={`d-flex flex-row p-2 ${border} align-items-center`}>
      <div className="ml-1">
        <img
          src={user.avatar}
          alt="avatar"
          style={{ width: "25px", borderRadius: "50%" }}
        />
        <div className="ml-4">
          <span className="d-block">{user.username}</span>
          <small style={{ opacity: 0.7 }}>{user.firstname}</small>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
