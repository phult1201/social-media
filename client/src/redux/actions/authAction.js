import { postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../constant";
import valid from "../../utils/valid";

export const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      const res = await postDataAPI("login", data);
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
      localStorage.setItem("firstLogin", true);
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { access_token: res.data.access_token, user: res.data.user },
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const register = (data) => {
  return async (dispatch) => {
    try {
      const errorValid = valid(data);
      if (errorValid.errorLength > 0)
        return dispatch({
          type: GLOBALTYPES.ALERT,
          payload: errorValid.errorMsg,
        });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      const res = await postDataAPI("register", data);
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { access_token: res.data.access_token, user: res.data.user },
      });
      localStorage.setItem("firstLogin", true);
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("firstLogin");
      await postDataAPI("logout");
      window.location.href = "/";
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const refreshtoken = () => {
  return async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      try {
        const res = await postDataAPI("refresh_token");
        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: { access_token: res.data.access_token, user: res.data.user },
        });
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      } catch (error) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: error.response.data.msg },
        });
      }
    }
  };
};
