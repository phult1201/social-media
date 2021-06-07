import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="card-user">
      <img src={user.avatar} alt="avatar" className="card-user-img" />
      <div className="card-user-info">
        {/* <span className="d-block">{user.username}</span> */}
        <span>{user.firstname}</span>
        <span>{user.lastname}</span>
      </div>
    </div>
  );
};

export default UserCard;
