import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authAction";

const Header = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
    { label: "Notify", icon: "favorite", path: "/notify" },
  ];

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const isActive = (isPath) => {
    if (isPath === pathname) return "active";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
      <Link className="navbar-brand text-uppercase" to="/">
        Social-Media
      </Link>

      <div className="menu" id="navbarSupportedContent">
        <ul className="navbar-nav flex-row" style={{ alignItems: "center" }}>
          {navLinks.map((link, index) => (
            <li className={`nav-item mr-2 ${isActive(link.path)}`} key={index}>
              <Link className="nav-link" to={link.path}>
                <span className="material-icons">{link.icon}</span>
              </Link>
            </li>
          ))}

          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src={auth.user.avatar} alt="avatar" className="avatar" />
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
                Profile
              </Link>
              <Link className="dropdown-item" to="/">
                Dark mode
              </Link>
              <div className="dropdown-divider"></div>
              <Link
                className="dropdown-item"
                to="/"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;