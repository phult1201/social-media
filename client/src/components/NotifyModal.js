import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "./avatar/Avatar";
import moment from "moment";

const NotifyModal = () => {
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
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
          <div key={index} className="">
            <Link to={`${msg.url}`}>
              <Avatar avaImg={auth.user.avatar} avaSize="small" />
            </Link>
            <div>
              <div>{msg.text}</div>
              <div>
                {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
              </div>
              <div>
                <Avatar avaImg={msg.image} avaSize="small" />
              </div>
            </div>
            <div>
              <small>
                {moment(msg.createdAt).fromNow()}{" "}
                {!msg.isRead && (
                  <i className="fas fa-circle" style={{ color: "blue" }} />
                )}
              </small>
            </div>
          </div>
        ))}
      </div>
      <div className="notify_footer">
        <div className="">Delete All</div>
      </div>
    </div>
  );
};

export default NotifyModal;
