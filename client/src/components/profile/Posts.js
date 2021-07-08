import React, { useEffect, useState } from "react";
import PostThumb from "./PostThumb";
import LoadMoreBtn from "../LoadMoreBtn";
import LoadIcon from "../LoadIcon";
import { getDataAPI } from "../../utils/fetchData";
import { PROFILE_TYPES } from "../../redux/constant";

const Posts = ({ auth, profile, dispatch, id }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setPage(data.page);
        setResult(data.result);
      }
    });
  }, [profile.posts, id]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `/user_posts/${id}?limit=${page * 3}`,
      auth.access_token
    );
    const newData = { ...res.data, page: page + 1, _id: id };
    dispatch({ type: PROFILE_TYPES.UPDATE_PROFILE_POSTS, payload: newData });
    setLoad(false);
  };

  return (
    <div>
      <PostThumb posts={posts} result={result} />

      {load && <LoadIcon />}

      {!load && (
        <LoadMoreBtn
          result={posts.result}
          page={page}
          handleLoadMore={handleLoadMore}
          load={load}
        />
      )}
    </div>
  );
};

export default Posts;
