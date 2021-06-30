import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../avatar/Avatar";
import { Link } from "react-router-dom";
import moment from "moment";
import LikeButton from "../LikeButton";
import CommentMenu from "./CommentMenu";
import {
  likeComment,
  updateComment,
  unLikeComment,
} from "../../../redux/actions/commentAction";
import InputComment from "./InputComment";

const CommentCard = ({ post, comment, commentId, children }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [showRight, setShowRight] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onReply, setOnReply] = useState(false);

  const { auth } = useSelector((state) => state);

  useEffect(() => {
    setContent(comment.content);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  const handleReply = async () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, newContent: content, auth }));
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
                {comment.tag && comment.tag._id !== comment.user._id && (
                  <Link to={`/profile/${comment.tag._id}`}>
                    @{comment.tag.lastname} {comment.tag.firstname}
                  </Link>
                )}
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
                <small className="likes" onClick={handleUpdate}>
                  Update
                </small>
                <small className="reply" onClick={() => setOnEdit(false)}>
                  Cancel
                </small>
              </>
            ) : (
              <>
                <small className="likes">{comment.likes.length} Likes</small>
                <small className="reply" onClick={handleReply}>
                  {onReply ? "Cancel" : "Reply"}
                </small>
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
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <CommentMenu
            post={post}
            comment={comment}
            auth={auth}
            setOnEdit={setOnEdit}
          />
        </div>
      </div>
      {onReply && (
        <div style={{ marginTop: "10px", fontSize: "1.4rem" }}>
          <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
            <Link
              to={`/profile/${onReply.user._id}`}
              style={{ color: "#39A2DB" }}
            >
              {" "}
              @{onReply.user.firstname} {onReply.user.lastname}
            </Link>
          </InputComment>
        </div>
      )}
      {children}
    </div>
  );
};

export default CommentCard;
