import { postDataAPI } from "../../utils/fetchData";

export const TYPES = {
  AUTH: "AUTH",
};

export const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      const res = await postDataAPI("login", data);
      dispatch({ type: "NOTIFY", payload: { success: res.data.msg } });
      localStorage.setItem("firstLogin", true);
      dispatch({ type: TYPES.AUTH, payload: { access_token: res.data.access_token, user: res.data.user } });
    } catch (error) {
      dispatch({ type: "NOTIFY", payload: { error: error.response.data.msg } });
    }
  };
};
