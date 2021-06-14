import React from "react";
import Avatar from "../avatar/Avatar";

const UserCard = ({ user, children }) => {
  return (
    <div className="card-user">
      <Avatar avaImg={user.avatar} avaSize="small" className="card-user-img" />
      <div className="card-user-info">
        <span>{user.firstname}</span>
        <span>{user.lastname}</span>
      </div>

      {children}
    </div>
  );
};

export default UserCard;
