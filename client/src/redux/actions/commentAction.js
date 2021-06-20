import { GLOBALTYPES, POST_TYPES } from "../constant";
import { postDataAPI } from "../../utils/fetchData";

export const createComment = (post, newComment, auth) => {
  return async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      const data = { ...newComment, postId: post._id };
      const res = await postDataAPI("/comment", data, auth.access_token);
      console.log(res);
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};
