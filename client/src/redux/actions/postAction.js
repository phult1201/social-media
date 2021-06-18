import { uploadImage } from "../../utils/imageUpload";
import { getDataAPI, postDataAPI, patchDataAPI } from "../../utils/fetchData";
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
      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPost, user: auth.user },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const updatePost = ({ content, images, auth, status }) => {
  return async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter((image) => !image.url);
    const imgOldUrl = images.filter((image) => image.url);

    if (
      status.content === content &&
      imgNewUrl.length === 0 &&
      imgOldUrl.length === status.images.length
    )
      return;
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (imgNewUrl.length > 0) media = await uploadImage(imgNewUrl);
      const res = await patchDataAPI(
        `/post/${status._id}`,
        { content, images: [...imgOldUrl, ...media] },
        auth.access_token
      );
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost });
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

export const likePost = ({ post, auth }) => {
  return async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      await patchDataAPI(`/post/${post._id}/like`, null, auth.access_token);
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const unLikePost = ({ post, auth }) => {
  return async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      await patchDataAPI(`/post/${post._id}/unlike`, null, auth.access_token);
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};
