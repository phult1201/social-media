import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import OutsideAlerter from "./custom_components/OutsideAlerter";
import Avatar from "./avatar/Avatar";

import moment from "moment";

const NotifyModal = ({ setShowNotifyModal }) => {
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <OutsideAlerter setShowDropdown={setShowNotifyModal}>
      <div className="notify">
        <div className="notify_header">
          <h3>Notification</h3>
          {notify.sound ? (
            <i className="fas fa-bell" />
          ) : (
            <i className="fas fa-bell-slash" />
          )}
        </div>

        <div className="notify_body">
          {notify.data.length === 0 && (
            <i className="fas fa-bell-slash" style={{ width: "40px" }} />
          )}
          {notify.data.map((msg, index) => (
            <Link to={`${msg.url}`}>
              <div
                key={index}
                className="notify_body-content"
                onClick={() => setShowNotifyModal(false)}
              >
                <Avatar avaImg={msg.user.avatar} avaSize="small" />

                <div className="notify_body-content-text">
                  <h4>
                    {msg.user.firstname} {msg.user.lastname}
                  </h4>{" "}
                  {msg.text}{" "}
                  {msg.content && <span>{msg.content.slice(0, 40)}...</span>}{" "}
                </div>

                <small>
                  {moment(msg.createdAt).fromNow()}{" "}
                  {!msg.isRead && (
                    <i className="fas fa-circle" style={{ color: "blue" }} />
                  )}
                </small>
              </div>
            </Link>
          ))}
        </div>

        <div className="notify_footer">
          <div className="">Delete All</div>
        </div>
      </div>
    </OutsideAlerter>
  );
};

export default NotifyModal;
