import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDiscoverPosts } from "../redux/actions/discoverAction";
import { DISCOVER_TYPES } from "../redux/constant";
import Loading from "../components/alert/Loading";
import LoadIcon from "../components/LoadIcon";
import PostThumb from "../components/profile/PostThumb";
import LoadMoreBtn from "../components/LoadMoreBtn";
import { getDataAPI } from "../utils/fetchData";

const Discover = () => {
  const { auth, discover } = useSelector((state) => state);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.access_token));
    }
  }, [dispatch, auth.access_token, discover.firstLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `/post_discover?limit=${discover.page * 3}`,
      auth.access_token
    );
    dispatch({ type: DISCOVER_TYPES.UPDATE_DISCOVER_POSTS, payload: res.data });
    setLoad(false);
  };

  if (discover.loading) return <Loading />;

  return (
    <div>
      <PostThumb posts={discover.posts} result={discover.result} />

      {load && <LoadIcon />}

      {!load && (
        <LoadMoreBtn
          result={discover.result}
          page={discover.page}
          handleLoadMore={handleLoadMore}
          load={load}
        />
      )}
    </div>
  );
};

export default Discover;
