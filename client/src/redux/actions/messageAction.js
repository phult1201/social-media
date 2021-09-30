import { MESSAGE_TYPES, GLOBALTYPES, DeleteData } from "../constant";
import { deleteDataAPI, getDataAPI, postDataAPI } from "../../utils/fetchData";

export const addMessage = ({ msg, auth, socket }) => {
  return async (dispatch) => {
    dispatch({ type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg });
    const { _id, avatar, firstname, lastname, username } = auth.user;
    socket.emit("addMessage", {
      ...msg,
      user: { _id, avatar, firstname, lastname, username },
    });
    try {
      await postDataAPI("/message", msg, auth.access_token);
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const getConversations = ({ auth, page = 1 }) => {
  return async (dispatch) => {
    try {
      const res = await getDataAPI(
        `/conversations?limit=${page * 9}`,
        auth.access_token
      );
      let newArr = [];
      res.data.conversations.forEach((item) => {
        item.recipients.forEach((recipient) => {
          if (recipient._id !== auth.user._id) {
            newArr.push({ ...recipient, text: item.text, media: item.media });
          }
        });
      });
      dispatch({
        type: MESSAGE_TYPES.GET_CONVERSATIONS,
        payload: { newArr, result: res.data.result },
      });
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const getMessages = ({ auth, id, page = 1 }) => {
  return async (dispatch) => {
    try {
      const res = await getDataAPI(
        `/messages/${id}?limit=${page * 9}`,
        auth.access_token
      );
      const newData = { ...res.data, messages: res.data.messages.reverse() };
      dispatch({
        type: MESSAGE_TYPES.GET_MESSAGES,
        payload: { ...newData, _id: id, page },
      });
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const loadMoreMessages = ({ auth, id, page = 1 }) => {
  return async (dispatch) => {
    try {
      const res = await getDataAPI(
        `/messages/${id}?limit=${page * 9}`,
        auth.access_token
      );
      const newData = { ...res.data, messages: res.data.messages.reverse() };
      dispatch({
        type: MESSAGE_TYPES.UPDATE_MESSAGES,
        payload: { ...newData, _id: id, page },
      });
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const deleteMessages = ({ msg, data, auth }) => {
  return async (dispatch) => {
    const newData = DeleteData(data, msg._id);
    dispatch({
      type: MESSAGE_TYPES.DELETE_MESSAGES,
      payload: { newData, _id: msg.recipient },
    });
    try {
      await deleteDataAPI(`/message/${msg._id}`, auth.access_token);
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const deletConversation = ({ auth, id }) => {
  return async (dispatch) => {
    dispatch({ type: MESSAGE_TYPES.DELETE_CONVERSATION, payload: id });

    try {
      await deleteDataAPI(`/conversation/${id}`, auth.access_token);
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Some thing wrong" },
      });
    }
  };
};
