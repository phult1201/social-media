import { TYPES } from "../actions/authAction";

const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.AUTH:
      state = { ...state, ...action.payload };
      break;
    default:
      return state;
  }
  return state;
};

export default authReducer;
