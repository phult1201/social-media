import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../avatar/Avatar";
import { Link } from "react-router-dom";
import moment from "moment";
import LikeButton from "../LikeButton";
import CommentMenu from "./CommentMenu";
import { updateComment } from "../../../redux/actions/commentAction";

const CommentCard = ({ post, comment }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [showRight, setShowRight] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    setContent(comment.content);
  }, [comment]);

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  const handleLike = async () => {};

  const handleUnLike = async () => {};

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  return (
    <div className="comment-card" style={styleCard}>
      <div className="comment-card_avatar">
        <Link to={`/profile/${comment.user._id}`}>
          <Avatar
            avaSize="very-small"
            avaImg={comment.user.avatar}
            style={{ display: "inline-block" }}
          />
          <span style={{ display: "inline-block" }}>
            {comment.user.firstname} {comment.user.lastname}
          </span>
        </Link>
      </div>
      <div
        className="comment-card_content"
        style={{}}
        onMouseEnter={() => setShowRight(1)}
        onMouseLeave={() => setShowRight(0)}
      >
        <div className="comment-card_content--left">
          <div className="text-content">
            {onEdit ? (
              <textarea
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  resize: "none",
                  width: "95%",
                  outline: "none",
                  border: "1px solid #ccc",
                  padding: "4px",
                }}
              />
            ) : (
              <>
                <span className="text">
                  {content.length < 100
                    ? content
                    : readMore
                    ? content + " "
                    : content.slice(0, 100) + "..."}
                </span>
                {content.length > 100 && (
                  <span
                    className="read-more"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? "Hide" : "Read more"}
                  </span>
                )}
              </>
            )}
          </div>
          <div className="small-content">
            {onEdit ? (
              <>
                <small
                  className="likes"
                  style={{ cursor: "pointer" }}
                  onClick={handleUpdate}
                >
                  Update
                </small>
                <small
                  className="reply"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOnEdit(false)}
                >
                  Cancel
                </small>
              </>
            ) : (
              <>
                <small className="likes">{comment.likes.length} Likes</small>
                <small className="reply">Reply</small>
              </>
            )}
            <small className="moment">
              {moment(comment.createdAt).fromNow()}
            </small>
          </div>
        </div>

        <div
          className="comment-card_content--right"
          style={{ opacity: `${showRight}` }}
        >
          <LikeButton handleLike={handleLike} handleUnLike={handleUnLike} />
          <CommentMenu
            post={post}
            comment={comment}
            auth={auth}
            setOnEdit={setOnEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
