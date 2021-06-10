import React from "react";

const Avatar = ({ avaSize, avaImg, avaEdit = false, name, onChange }) => {
  return (
    <div className="avatar">
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
    </div>
  );
};

export default Avatar;
