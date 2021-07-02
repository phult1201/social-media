import { POST_TYPES } from "../constant";

const detailPostReducer = (state = [], action) => {
  switch (action.type) {
    case POST_TYPES.GET_POST:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default detailPostReducer;
