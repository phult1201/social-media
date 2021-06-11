import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../redux/constant";
import Avatar from "../avatar/Avatar";
import { updateProfileUser } from "../../redux/actions/profileAction";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
  };

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  return (
    <>
      <div className="edit-profile">
        <div className="edit-profile_header">
          <label className="edit-profile_header-title">Edit</label>
          <button
            className="edit-profile_header-btn"
            onClick={() => setOnEdit(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form className="edit-profile_form" onSubmit={handleSubmit}>
          <div className="edit-profile_form-avatar">
            <Avatar
              avaImg={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
              avaSize="big"
              avaEdit={true}
              name="file"
              onChange={handleAvatar}
            />
          </div>

          <div className="edit-profile_form-col">
            <div className="">
              <label className="" htmlFor="firstname">
                First name
              </label>
              <input
                type="text"
                className=""
                id="firstname"
                name="firstname"
                value={firstname}
                onChange={handleInput}
                required={true}
              />
            </div>
            <div className="">
              <label className="" htmlFor="lastname">
                Last name
              </label>
              <input
                type="text"
                className=""
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={handleInput}
                required={true}
              />
            </div>
          </div>

          <div className="edit-profile_form-row">
            <label className="" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              className=""
              id="address"
              name="address"
              value={address}
              onChange={handleInput}
            />
          </div>

          <div className="edit-profile_form-row">
            <label className="" htmlFor="mobile">
              Mobile
            </label>
            <input
              type="text"
              className=""
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={handleInput}
              required={true}
            />
          </div>

          <div className="edit-profile_form-row">
            <label className="" htmlFor="website">
              Website
            </label>
            <input
              type="text"
              className=""
              id="website"
              name="website"
              value={website}
              onChange={handleInput}
              required={true}
            />
          </div>

          <div className="edit-profile_form-row">
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

          <div className="edit-profile_form-row">
            <label>Gender</label>
            <select name="gender" value={gender} onChange={handleInput}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button className="edit-profile_form-save">Save</button>
        </form>
      </div>
      <div className="overlay"></div>
    </>
  );
};

export default EditProfile;
