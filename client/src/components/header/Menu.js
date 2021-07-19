import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";
import { IoNotificationsOutline, IoNotificationsSharp } from "react-icons/io5";
import Avatar from "../avatar/Avatar";
import NotifyModal from "../NotifyModal";

const Menu = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
  ];
  const [show, setShow] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const isActive = (isPath) => {
    if (isPath === pathname) return "menu_list-item--active";
  };

  return (
    <div className="menu">
      <ul className="menu_list">
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link
              className={`menu_list-item ${isActive(link.path)}`}
              to={link.path}
            >
              <span className="material-icons">{link.icon}</span>
            </Link>
          </li>
        ))}

        {notify.data.length > 0 ? (
          <li
            className="menu_list-item"
            style={{
              fontSize: "2.4rem",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <IoNotificationsSharp
              onClick={() => setShowNotifyModal(!showNotifyModal)}
            />
            <span
              style={{
                position: "absolute",
                color: "#555",
                fontSize: "1.4rem",
                top: "-8px",
                right: "4px",
              }}
            >
              {notify.data.length}
            </span>
          </li>
        ) : (
          <li
            className="menu_list-item"
            style={{
              fontSize: "2.4rem",
              cursor: "pointer",
              position: "relative",

              top: "-8px",
              right: "4px",
            }}
          >
            <IoNotificationsOutline
              onClick={() => setShowNotifyModal(!showNotifyModal)}
            />
            <span
              style={{
                position: "absolute",
                color: "#555",
                top: "0",
                fontSize: "1.4rem",
              }}
            >
              {notify.data.length}
            </span>
          </li>
        )}

        <div className="menu_avatar" onClick={() => setShow(!show)}>
          <div style={{ cursor: "pointer" }}>
            <Avatar avaImg={auth.user.avatar} avaSize="small" />
          </div>

          {show && (
            <ul className="menu_avatar-list">
              <li>
                <span className="material-icons">account_circle</span>
                <Link to={`/profile/${auth.user._id}`}>Profile</Link>
              </li>
              <li>
                <span className="material-icons">nightlight_round</span>
                <Link to="/">Dark mode</Link>
              </li>
              <li>
                <span className="material-icons">logout</span>
                <Link to="/" onClick={() => dispatch(logout())}>
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
        {show && (
          <div className="menu_overlay" onClick={() => setShow(!show)}></div>
        )}
      </ul>

      {showNotifyModal && (
        <NotifyModal setShowNotifyModal={setShowNotifyModal} />
      )}
    </div>
  );
};
export default Menu;
