import React from "react";

const Avatar = ({
  avaSize,
  avaImg,
  avaEdit = false,
  name,
  onChange,
  className = "avatar-className",
  style,
  avaName = false,
  firstName = "",
  lastName = "",
  children,
}) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <div className="avatar-container">
        <img
          src={avaImg}
          className={`avatar-img avatar-img--${avaSize}`}
          alt="avatar"
        />

        {avaEdit && (
          <div className="avatar-edit">
            <div className="avatar-edit_container">
              <label htmlFor="avatar-input">
                <i className="fas fa-camera" /> Change
              </label>
              <input
                id="avatar-input"
                type="file"
                name={name}
                accept="image/*"
                onChange={onChange}
              />
            </div>
          </div>
        )}
      </div>
      {avaName && (
        <div className="avatar-name">
          <small>
            {firstName} {lastName}
          </small>
          <div className="avatar-name__message">
            <small>{children}</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
