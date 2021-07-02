import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../redux/actions/postAction";
import Posts from "../../components/home/Posts";

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
    <div>
      {post.map((item) => (
        <Posts />
      ))}
    </div>
  );
};

export default Post;
