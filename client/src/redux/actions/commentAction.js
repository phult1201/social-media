import { EditData, DeleteData, GLOBALTYPES, POST_TYPES } from "../constant";
import {
  deleteDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";
import { createNofity, removeNofity } from "./notifyAction";

export const createComment = ({ post, newComment, auth, socket }) => {
  return async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      };
      const res = await postDataAPI("/comment", data, auth.access_token);
      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = { ...post, comments: [...post.comments, newData] };
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

      socket.emit("createComment", newPost);

      const msg = {
        id: res.data.newComment._id,
        text: newComment.reply
          ? "mentioned you in a comment."
          : "has comment on your post.",
        recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
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

export const deleteComment = ({ post, auth, comment, socket }) => {
  return async (dispatch) => {
    const deleteArr = [
      ...post.comments.filter((cm) => cm.reply === comment._id),
      comment,
    ];
    const newPost = {
      ...post,
      comments: post.comments.filter(
        (cm) => !deleteArr.find((da) => cm._id === da._id)
      ),
    };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit("deleteComment", newPost);

    try {
      await deleteArr.forEach((item) => {
        deleteDataAPI(`/comment/${item._id}`, auth.access_token);

        const msg = {
          id: item._id,
          text: comment.reply
            ? "mentioned you in a comment."
            : "has comment on your post.",
          recipients: comment.reply ? [comment.tag._id] : [post.user._id],
          url: `/post/${post._id}`,
        };

        dispatch(removeNofity({ msg, auth, socket }));
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const updateComment = ({ comment, post, newContent, auth }) => {
  return async (dispatch) => {
    const newComment = EditData(post.comments, comment._id, {
      ...comment,
      content: newContent,
    });
    const newPost = { ...post, comments: newComment };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      await patchDataAPI(
        `/comment/${comment._id}`,
        { content: newContent },
        auth.access_token
      );
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const likeComment = ({ comment, post, auth }) => {
  return async (dispatch) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user] };
    const newComments = EditData(post.comments, comment._id, newComment);
    const newPost = { ...post, comments: newComments };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      await patchDataAPI(
        `/comment/${comment._id}/like`,
        null,
        auth.access_token
      );
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const unLikeComment = ({ comment, post, auth }) => {
  return async (dispatch) => {
    const newComment = {
      ...comment,
      likes: DeleteData(comment.likes, auth.user._id),
    };
    const newComments = EditData(post.comments, comment._id, newComment);
    const newPost = { ...post, comments: newComments };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      await patchDataAPI(
        `/comment/${comment._id}/unlike`,
        null,
        auth.access_token
      );
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};
