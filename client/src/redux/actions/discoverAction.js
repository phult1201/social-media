import { GLOBALTYPES, DISCOVER_TYPES } from "../constant";
import { getDataAPI } from "../../utils/fetchData";

export const getDiscoverPosts = (token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DISCOVER_TYPES.LOADING, payload: true });
      const res = await getDataAPI("/post_discover", token);
      console.log(res);
      dispatch({ type: DISCOVER_TYPES.GET_DISCOVER_POSTS, payload: res.data });
      dispatch({ type: DISCOVER_TYPES.LOADING, payload: false });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};
