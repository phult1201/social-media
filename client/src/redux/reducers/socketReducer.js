import { GLOBALTYPES } from "../constant";

const initialState = false;

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.SOCKET:
      return action.payload;

    default:
      return state;
  }
};

export default socketReducer;
