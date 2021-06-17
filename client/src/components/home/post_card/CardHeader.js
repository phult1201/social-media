import moment from "moment";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../../avatar/Avatar";
import { GLOBALTYPES } from "../../../redux/constant";

const CardHeader = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const distpach = useDispatch();

  const handleEditPost = () => {
    distpach({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
    console.log();
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
        <i className="fas fa-ellipsis-h"></i>
        <div className="dropdown-post">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-post-item" onClick={handleEditPost}>
                <i className="far fa-edit"></i>
                <span>Edit Post</span>
              </div>

              <div className="dropdown-post-item">
                <i className="fas fa-trash"></i>
                <span>Delete Post</span>
              </div>
            </>
          )}
          <div className="dropdown-post-item">
            <i class="fas fa-copy"></i>
            <span>Coppy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
