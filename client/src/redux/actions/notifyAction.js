import { deleteDataAPI, getDataAPI, postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES, NOTIFY_TYPES } from "../constant";

export const createNofity = ({ msg, auth, socket }) => {
  return async (dispatch) => {
    try {
      await postDataAPI(`/notify`, msg, auth.access_token);
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
      const res = await deleteDataAPI(
        `/notify/${msg.id}?url=${msg.url}`,
        auth.access_token
      );
      console.log(res);
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
