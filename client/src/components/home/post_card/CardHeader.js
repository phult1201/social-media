import moment from "moment";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../avatar/Avatar";
import { GLOBALTYPES } from "../../../redux/constant";
import OutsideAlerter from "../../custom_components/OutsideAlerter";
import { deletePost } from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../utils/config";

const CardHeader = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const [showDropdown, setShowDropdown] = useState(false);

  const distpach = useDispatch();
  const history = useHistory();

  const handleEditPost = () => {
    distpach({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  const handleDeletePost = () => {
    if (window.confirm("Do you want to delete this post?")) {
      distpach(deletePost({ post, auth }));
      return history.push("/");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };

  return (
    <div className="card_header">
      <div className="card_header-left">
        <Avatar avaImg={post.user.avatar} avaSize="small" />
        <div>
          <h6>
            <Link to={`/profile/${post.user._id}`}>
              {" "}
              {post.user.firstname} {post.user.lastname}
            </Link>
          </h6>
          <small>{moment(post.createdAt).fromNow()}</small>
        </div>
      </div>
      <div className="card_header-right">
        <i
          className="fas fa-ellipsis-h"
          onClick={() => setShowDropdown(!showDropdown)}
        ></i>
        {showDropdown && (
          <OutsideAlerter setShowDropdown={setShowDropdown}>
            <div className="dropdown-post">
              {auth.user._id === post.user._id && (
                <>
                  <div className="dropdown-post-item" onClick={handleEditPost}>
                    <i className="far fa-edit"></i>
                    <span>Edit Post</span>
                  </div>

                  <div
                    className="dropdown-post-item"
                    onClick={() => {
                      handleDeletePost();
                      setShowDropdown();
                    }}
                  >
                    <i className="far fa-trash-alt"></i>
                    <span>Delete Post</span>
                  </div>
                </>
              )}
              <div
                className="dropdown-post-item"
                onClick={() => {
                  handleCopyLink();
                  setShowDropdown();
                }}
              >
                <i className="far fa-copy"></i>
                <span>Coppy Link</span>
              </div>
            </div>
          </OutsideAlerter>
        )}
      </div>
    </div>
  );
};

export default CardHeader;
