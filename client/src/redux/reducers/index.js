import { combineReducers } from "redux";
import auth from "./authReducer";
import notify from "./notifyReducer";

const rootReducer = combineReducers({
  auth,
  notify,
});

export default rootReducer;
