import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../redux/actions/postAction";
import PostCard from "../../components/home/post_card/PostCard";

const Post = () => {
  const { auth, detailPost } = useSelector((state) => state);

  const { id } = useParams();
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }));

    if (detailPost.length > 0) {
      const newArr = detailPost.filter((post) => post._id === id);
      setPost(newArr);
    }
  }, [dispatch, detailPost, id, auth]);

  return (
    <div className="detail-post" style={{ fontSize: "1.6rem" }}>
      {post.map((data, index) => (
        <PostCard post={data} key={index} />
      ))}
    </div>
  );
};

export default Post;
