import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  likePost,
  savePost,
  unLikePost,
  unsavePost,
} from "../../../redux/actions/postAction";
import ShareModal from "../ShareModal";
import LikeButton from "../LikeButton";
import { BASE_URL } from "../../../utils/config";
import {
  BsBookmarksFill,
  BsBookmarks,
  BsChatDots,
  BsReplyAll,
} from "react-icons/bs";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [saved, setSaved] = useState(false);

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
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user]);

  useEffect(() => {
    if (auth.user.saved.find((saveId) => saveId === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [post._id, auth.user.saved]);

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
            <BsChatDots />
          </Link>
          <BsReplyAll
            style={{ cursor: "pointer" }}
            onClick={() => setIsShare(!isShare)}
          />
        </div>
        {saved ? (
          <BsBookmarksFill
            onClick={() => dispatch(unsavePost({ post, auth }))}
          />
        ) : (
          <BsBookmarks onClick={() => dispatch(savePost({ post, auth }))} />
        )}
      </div>

      <div className="card_footer-count">
        <span>
          {post.likes.length} <i className="far fa-thumbs-up"></i>
        </span>
        <span>{post.comments.length} Comments</span>
      </div>

      {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} />}
    </div>
  );
};

export default CardFooter;
