import { GLOBALTYPES, POST_TYPES } from "../constant";
import { postDataAPI } from "../../utils/fetchData";

export const createComment = (post, newComment, auth) => {
  return async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      const data = { ...newComment, postId: post._id };
      const res = await postDataAPI("/comment", data, auth.access_token);

      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = { ...post, comments: [...post.comments, newData] };
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const updateComment = () => {
  return async (dispatch) => {};
};
