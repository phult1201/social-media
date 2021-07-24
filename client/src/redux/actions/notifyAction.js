import {
  deleteDataAPI,
  getDataAPI,
  postDataAPI,
  patchDataAPI,
} from "../../utils/fetchData";
import { GLOBALTYPES, NOTIFY_TYPES } from "../constant";

export const createNofity = ({ msg, auth, socket }) => {
  return async (dispatch) => {
    try {
      const res = await postDataAPI(`/notify`, msg, auth.access_token);
      socket.emit("createNotify", {
        ...res.data.notify,
        user: {
          lastname: auth.user.lastname,
          firstname: auth.user.firstname,
          avatar: auth.user.avatar,
        },
      });
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const removeNofity = ({ msg, auth, socket }) => {
  return async (dispatch) => {
    try {
      await deleteDataAPI(
        `/notify/${msg.id}?url=${msg.url}`,
        auth.access_token
      );

      socket.emit("removeNotify", msg);
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const getNotifies = (token) => {
  return async (dispatch) => {
    try {
      const res = await getDataAPI("/notifies", token);

      dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies });
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const isReadNotify = ({ msg, auth }) => {
  return async (dispatch) => {
    dispatch({
      type: NOTIFY_TYPES.UPDATE_NOTIFY,
      payload: { ...msg, isRead: true },
    });
    try {
      await patchDataAPI(`/isReadNotify/${msg._id}`, null, auth.access_token);
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const deleteAllNotifies = (access_token) => {
  return async (dispatch) => {
    dispatch({
      type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES,
      payload: [],
    });

    try {
      await deleteDataAPI(`/deleteAllNotify`, access_token);
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};
