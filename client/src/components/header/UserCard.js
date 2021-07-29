import React from "react";
import Avatar from "../avatar/Avatar";

const UserCard = ({ user, className, children }) => {
  return (
    <div className={`card-user ${className}`}>
      <Avatar
        avaImg={user.avatar}
        avaSize="small"
        className="card-user-img"
        avaName={true}
        firstName={user.firstname}
        lastName={user.lastname}
      >
        {children}
      </Avatar>
    </div>
  );
};

export default UserCard;
