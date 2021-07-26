import { MESSAGE_TYPES } from "../constant";

const initialState = {
  users: [],
  resultUsers: 0,
  data: [],
  resultData: 0,
  firstLoad: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_TYPES.ADD_USER_MESSAGE:
      return { ...state, users: [action.payload, ...state.users] };

    default:
      return state;
  }
};

export default messageReducer;
