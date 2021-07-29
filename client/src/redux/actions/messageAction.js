import { MESSAGE_TYPES } from "../constant";

export const addUser = ({ user, message }) => {
  return (dispatch) => {
    if (message.users.every((item) => item._id !== user._id)) {
      dispatch({ type: MESSAGE_TYPES.ADD_USER, payload: user });
    }
  };
};

export const addMessage = ({ msg, auth, socket }) => {
  return (dispatch) => {
    console.log(msg);
    dispatch({ type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg });
  };
};
