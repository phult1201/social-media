import { uploadImage } from "../../utils/imageUpload";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES, POST_TYPES } from "../constant";

export const createPost = ({ content, images, auth }) => {
  return async (dispatch) => {
    let media = [];
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (images.length > 0) media = await uploadImage(images);
      const res = await postDataAPI(
        "/posts",
        { content, images: media },
        auth.access_token
      );
      dispatch({ type: POST_TYPES.CREATE_POST, payload: res.data.newPost });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const getPosts = (access_token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
      const res = await getDataAPI("/posts", access_token);
      dispatch({ type: POST_TYPES.GET_POSTS, payload: res.data });
      dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};
