import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import profile from "./profileReducer";
import status from "./statusReducer";
import homePosts from "./postReducer";

const rootReducer = combineReducers({
  auth,
  alert,
  profile,
  status,
  homePosts,
});

export default rootReducer;
