import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/authAction";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { auth } = useSelector((state) => state);
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
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
          <input
            type="text"
            name="email"
            id="exampleInputEmail1"
            onChange={handleChangeInput}
            required={true}
            value={email}
          />
          <label htmlFor="exampleInputEmail1" className="auth_row_label-text">
            User name
          </label>
        </div>
        <div className="auth_row">
          <input
            autoComplete="on"
            type="password"
            name="password"
            id="exampleInputPassword1"
            onChange={handleChangeInput}
            value={password}
            required={true}
          />
          <label
            htmlFor="exampleInputPassword1"
            className="auth_row_label-text"
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          className="auth_btn"
          disabled={email && password ? false : true}
        >
          Submit
        </button>

        <p className="my-2">
          {" "}
          You dont have an account{" "}
          <Link to="/register" style={{ color: "crimson" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
