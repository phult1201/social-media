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
    case MESSAGE_TYPES.ADD_USER:
      return { ...state, users: [action.payload, ...state.users] };
    case MESSAGE_TYPES.ADD_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload],
        users: state.users.map((user) =>
          user._id === action.payload.recipient ||
          user._id === action.payload.sender
            ? {
                ...user,
                text: action.payload.text,
                media: action.payload.media,
              }
            : user
        ),
      };
    default:
      return state;
  }
};

export default messageReducer;
