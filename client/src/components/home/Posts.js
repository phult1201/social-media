import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./post_card/PostCard";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { POST_TYPES } from "../../redux/constant";
import LoadIcon from "../LoadIcon";

const Posts = () => {
  const { auth, homePosts } = useSelector((state) => state);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `/posts?limit=${homePosts.page * 9}`,
      auth.access_token
    );
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    });
    setLoad(false);
  };

  if (!homePosts) return;

  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}

      {load ? (
        <LoadIcon />
      ) : (
        <LoadMoreBtn
          result={homePosts.result}
          page={homePosts.page}
          handleLoadMore={handleLoadMore}
          load={load}
        />
      )}
    </div>
  );
};

export default Posts;
