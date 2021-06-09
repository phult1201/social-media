import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../redux/constant";

const EditProfile = ({ setOnEdit }) => {
  const initialState = {
    firstname: "",
    lastname: "",
    address: "",
    mobile: "",
    website: "",
    story: "",
    gender: "",
  };
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [userData, setUserData] = useState(initialState);
  const { firstname, lastname, address, mobile, website, story, gender } =
    userData;
  const { auth } = useSelector((state) => state);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const error = checkImage(file);
    if (error) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error } });
    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  return (
    <div className="edit-profile">
      <button className="edit-profile_btn" onClick={() => setOnEdit(false)}>
        Close
      </button>

      <form className="">
        <div className="infor_container-avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
          />
          <span>
            <i className="fas fa-camera" />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={handleAvatar}
            />
          </span>
        </div>

        <div className="">
          <div>
            <label htmlFor="firstname">First name</label>
            <input
              type="text"
              className=""
              id="firstname"
              name="firstname"
              value={firstname}
              onChange={handleInput}
            />
          </div>

          <div>
            <label htmlFor="lastname">Last name</label>
            <input
              type="text"
              className=""
              id="lastname"
              name="lastname"
              value={lastname}
              onChange={handleInput}
            />
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className=""
              id="address"
              name="address"
              value={address}
              onChange={handleInput}
            />
          </div>

          <div>
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              className=""
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={handleInput}
            />
          </div>

          <div>
            <label htmlFor="website">Website</label>
            <input
              type="text"
              className=""
              id="website"
              name="website"
              value={website}
              onChange={handleInput}
            />
          </div>

          <div>
            <label htmlFor="story">Story</label>
            <textarea
              type="text"
              className=""
              id="story"
              name="story"
              cols="30"
              rows="4"
              value={story}
              onChange={handleInput}
            />
          </div>

          <div>
            <label>Gender</label>
            <select name="gender" value={gender} onChange={handleInput}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <button>Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
