import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { likePost, unLikePost } from "../../../redux/actions/postAction";
import LikeButton from "../LikeButton";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likePost({ post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikePost({ post, auth }));
    setLoadLike(false);
  };

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [post.likes, auth.user]);

  return (
    <div className="card_footer">
      <div className="card_footer-icon">
        <div>
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <Link to={`/post/${post._id}`}>
            <i className="far fa-comment" />
          </Link>
          <i className="far fa-paper-plane"></i>
        </div>
        <i className="far fa-bookmark" />
      </div>

      <div className="card_footer-count">
        <span>
          {post.likes.length} <i className="far fa-thumbs-up"></i>
        </span>
        <span>{post.comments.length} Comments</span>
      </div>
    </div>
  );
};

export default CardFooter;
