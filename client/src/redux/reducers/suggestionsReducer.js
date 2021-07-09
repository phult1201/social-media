import { SUGGESTIONS_TYPE } from "../constant";

const initialState = {
  loading: false,
  users: [],
};

const suggestionsUser = (state = initialState, action) => {
  switch (action.type) {
    case SUGGESTIONS_TYPE.LOADING_SUGGESTIONS:
      return {
        ...state,
        loading: action.payload,
      };
    case SUGGESTIONS_TYPE.GET_USERS_SUGGESTIONS:
      return {
        ...state,
        users: action.payload.users,
        result: action.payload.result,
      };
    default:
      return state;
  }
};

export default suggestionsUser;
