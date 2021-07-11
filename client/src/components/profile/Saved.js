import React, { useEffect, useState } from "react";
import PostThumb from "./PostThumb";
import LoadMoreBtn from "../LoadMoreBtn";
import LoadIcon from "../LoadIcon";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/constant";

const Saved = ({ auth, dispatch }) => {
  const [savePosts, setSavePosts] = useState([]);
  const [result, setResult] = useState(3);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getDataAPI(`/getSavePosts`, auth.access_token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setResult(res.data.result);
        setLoad(false);
      })
      .catch((error) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          pyaload: { error: error.response.data.msg },
        });
      });
    return setSavePosts([]);
  }, [auth.access_token, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `/getSavePosts?limit=${page * 3}`,
      auth.access_token
    );
    setSavePosts(res.data.savePosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoad(false);
  };

  return (
    <div>
      <PostThumb posts={savePosts} result={result} />

      {load && <LoadIcon />}

      {!load && (
        <LoadMoreBtn
          result={result}
          page={page}
          handleLoadMore={handleLoadMore}
          load={load}
        />
      )}
    </div>
  );
};

export default Saved;
