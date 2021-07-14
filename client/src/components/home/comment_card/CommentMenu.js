import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../redux/actions/commentAction";
import OutsideAlerter from "../../custom_components/OutsideAlerter";

const CommentMenu = ({ post, comment, setOnEdit }) => {
  const { auth, socket } = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ post, auth, comment, socket }));
    }
  };

  const MenuItem = () => {
    return (
      <>
        <i
          className="far fa-edit"
          onClick={() => {
            setOnEdit(true);
            setShow(false);
          }}
        >
          {" "}
          Edit
        </i>
        <i
          className="far fa-trash-alt"
          onClick={() => {
            handleRemove();
            setShow(false);
          }}
        >
          {" "}
          Remove
        </i>
      </>
    );
  };

  return (
    <div className="comment-menu">
      {(post.user._id === auth.user._id ||
        comment.user._id === auth.user._id) && (
        <>
          <div className="comment-menu_dot" onClick={() => setShow(!show)}>
            <span className="material-icons">more_vert</span>
          </div>

          {show && (
            <OutsideAlerter setShowDropdown={setShow}>
              <div className="comment-menu_action">
                {post.user._id === auth.user._id ? (
                  comment.user._id === auth.user._id ? (
                    MenuItem()
                  ) : (
                    <i
                      className="far fa-trash-alt"
                      onClick={() => {
                        handleRemove();
                        setShow(false);
                      }}
                    >
                      {" "}
                      Remove
                    </i>
                  )
                ) : (
                  comment.user._id === auth.user._id && MenuItem()
                )}
              </div>
            </OutsideAlerter>
          )}
        </>
      )}
    </div>
  );
};

export default CommentMenu;
