import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../redux/actions/authAction";

const Register = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { email, password, firstname, lastname, cf_password, username } =
    userData;
  const { auth, alert } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  useEffect(() => {
    if (auth.access_token) {
      history.push("/");
    }
  }, [auth.access_token, history]);

  return (
    <div className="auth">
      <form onSubmit={handleSubmit} className="auth_form">
        <h3 className="auth_title">Social-Network</h3>

        <div className="auth_row">
          <div className="auth_row auth_row--half">
            <input
              type="text"
              id="firstname"
              name="firstname"
              onChange={handleChangeInput}
              value={firstname}
              required={true}
            />
            <label htmlFor="firstname" className="auth_row_label-text">
              First name
            </label>
            <small className="form-text text-danger">
              {alert.firstname ? alert.firstname : ""}
            </small>
          </div>

          <div className="auth_row auth_row--half">
            <input
              type="text"
              id="lastname"
              name="lastname"
              onChange={handleChangeInput}
              value={lastname}
              required={true}
            />
            <label htmlFor="lastname" className="auth_row_label-text">
              Last name
            </label>

            <small className="form-text text-danger">
              {alert.lastname ? alert.lastname : ""}
            </small>
          </div>
        </div>

        <div className="auth_row">
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChangeInput}
            value={username.toLowerCase().replace(/ /g, "")}
            required={true}
          />
          <label htmlFor="username" className="auth_row_label-text">
            User name
          </label>

          <small className="form-text text-danger">
            {alert.username ? alert.username : ""}
          </small>
        </div>

        <div className="auth_row">
          <input
            type="text"
            id="exampleInputEmail1"
            name="email"
            onChange={handleChangeInput}
            value={email}
            required={true}
          />
          <label htmlFor="exampleInputEmail1" className="auth_row_label-text">
            Email address
          </label>

          <small className="form-text text-danger">
            {alert.email ? alert.email : ""}
          </small>
        </div>

        <div className="auth_row">
          <input
            autoComplete="on"
            type="password"
            id="password"
            name="password"
            onChange={handleChangeInput}
            value={password}
            required={true}
          />
          <label htmlFor="password" className="auth_row_label-text">
            Password
          </label>

          <small className="form-text text-danger">
            {alert.password ? alert.password : ""}
          </small>
        </div>

        <div className="auth_row">
          <input
            autoComplete="on"
            type="password"
            id="cf_password"
            name="cf_password"
            onChange={handleChangeInput}
            value={cf_password}
            required={true}
          />
          <label htmlFor="cf_password" className="auth_row_label-text">
            Confirm Password
          </label>

          <small className="form-text text-danger">
            {alert.cf_password ? alert.cf_password : ""}
          </small>
        </div>

        <div className="auth_row auth_row--space-around">
          <label htmlFor="male" className="col">
            Male:{" "}
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>
          <label htmlFor="female" className="col">
            Female:{" "}
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChangeInput}
            />
          </label>
        </div>

        <button type="submit" className="auth_btn">
          Register
        </button>

        <p className="my-2">
          {" "}
          You already have an account{" "}
          <Link to="/login" style={{ color: "crimson" }}>
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
