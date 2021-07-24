import { uploadImage } from "../../utils/imageUpload";
import {
  getDataAPI,
  postDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from "../../utils/fetchData";
import { GLOBALTYPES, POST_TYPES } from "../constant";
import { createNofity, removeNofity } from "./notifyAction";

export const createPost = ({ content, images, auth, socket }) => {
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

      // Notification
      const msg = {
        id: res.data.newPost._id,
        text: "added a new post",
        recipients: res.data.newPost.user.followers,
        url: `/post/${res.data.newPost._id}`,
        content,
        image: media[0].url,
      };

      dispatch(createNofity({ msg, auth, socket }));
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const deletePost = ({ post, auth, socket }) => {
  return async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: post });
    try {
      const res = await deleteDataAPI(`/post/${post._id}`, auth.access_token);

      const msg = {
        id: post._id,
        text: "added a new post",
        recipients: res.data.newPost.user.followers,
        url: `/post/${post._id}`,
      };

      dispatch(removeNofity({ msg, auth, socket }));
    } catch (error) {
      return dispatch({
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
      dispatch({
        type: POST_TYPES.GET_POSTS,
        payload: { ...res.data, page: 2 },
      });
      dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const getPost = ({ detailPost, auth, id }) => {
  return async (dispatch) => {
    if (detailPost.every((post) => post._id !== id)) {
      try {
        const res = await getDataAPI(`/post/${id}`, auth.access_token);
        dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post });
      } catch (error) {
        return dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: error.response.data.msg },
        });
      }
    }
  };
};

export const likePost = ({ post, auth, socket }) => {
  return async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user._id] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit("likePost", newPost);

    try {
      await patchDataAPI(`/post/${post._id}/like`, null, auth.access_token);
      const msg = {
        id: auth.user._id,
        text: "like your post",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0].url,
      };

      dispatch(createNofity({ msg, auth, socket }));
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const unLikePost = ({ post, auth, socket }) => {
  return async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit("unLikePost", newPost);

    try {
      await patchDataAPI(`/post/${post._id}/unlike`, null, auth.access_token);

      const msg = {
        id: auth.user._id,
        text: "like your post",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
      };

      dispatch(removeNofity({ msg, auth, socket }));
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const savePost = ({ post, auth }) => {
  return async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
    try {
      await patchDataAPI(`/savePost/${post._id}`, null, auth.access_token);
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const unsavePost = ({ post, auth }) => {
  return async (dispatch) => {
    const newUser = {
      ...auth.user,
      saved: auth.user.saved.filter((saveId) => saveId !== post._id),
    };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
    try {
      await patchDataAPI(`/unsavePost/${post._id}`, null, auth.access_token);
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};
