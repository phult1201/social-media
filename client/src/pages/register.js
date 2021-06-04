import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
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
  const {
    email,
    password,
    firstname,
    lastname,
    cf_password,
    username,
    gender,
  } = userData;
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
    if (auth.token) {
      history.push("/");
    }
  }, [auth.token, history]);

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">Social-Network</h3>

        <div className="form-group row">
          <div className="col">
            <label htmlFor="firstname">First name</label>
            <input
              type="text"
              className={`form-control ${alert.firstname ? "is-invalid" : ""}`}
              id="firstname"
              name="firstname"
              onChange={handleChangeInput}
              value={firstname}
            />
            <small className="form-text text-danger">
              {alert.firstname ? alert.firstname : ""}
            </small>
          </div>

          <div className="col">
            <label htmlFor="lastname">Last name</label>
            <input
              type="text"
              className={`form-control ${alert.lastname ? "is-invalid" : ""}`}
              id="lastname"
              name="lastname"
              onChange={handleChangeInput}
              value={lastname}
            />
            <small className="form-text text-danger">
              {alert.lastname ? alert.lastname : ""}
            </small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="username">User name</label>
          <input
            type="text"
            className={`form-control ${alert.username ? "is-invalid" : ""}`}
            id="username"
            name="username"
            onChange={handleChangeInput}
            value={username.toLowerCase().replace(/ /g, "")}
          />
          <small className="form-text text-danger">
            {alert.username ? alert.username : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className={`form-control ${alert.email ? "is-invalid" : ""}`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={handleChangeInput}
            value={email}
          />
          <small className="form-text text-danger">
            {alert.email ? alert.email : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            autoComplete="on"
            type="password"
            className={`form-control ${alert.password ? "is-invalid" : ""}`}
            id="password"
            name="password"
            onChange={handleChangeInput}
            value={password}
          />
          <small className="form-text text-danger">
            {alert.password ? alert.password : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="cf_password">Confirm Password</label>
          <input
            autoComplete="on"
            type="password"
            className={`form-control ${alert.cf_password ? "is-invalid" : ""}`}
            name="cf_password"
            onChange={handleChangeInput}
            value={cf_password}
          />
          <small className="form-text text-danger">
            {alert.cf_password ? alert.cf_password : ""}
          </small>
        </div>

        <div className="row justify-conten-between mx-0 mb-1">
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

        <button
          type="submit"
          className="btn btn-dark w-100"
          // disabled={email && password ? false : true}
        >
          Register
        </button>

        <p className="my-2">
          {" "}
          You already have an account{" "}
          <Link to="/register" style={{ color: "crimson" }}>
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
