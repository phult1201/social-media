import { GLOBALTYPES } from "../constant";

const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      state = { ...state, ...action.payload };
      break;
    default:
      return state;
  }
  return state;
};

export default authReducer;
