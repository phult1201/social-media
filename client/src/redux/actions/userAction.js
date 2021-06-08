import { GLOBALTYPES, PROFILE_TYPES } from "../constant";
import { getDataAPI } from "../../utils/fetchData";

export const getProfileUser = ({ users, id, auth }) => {
  return async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
        const res = await getDataAPI(`/user/${id}`, auth.access_token);
        dispatch({ type: PROFILE_TYPES.GET_USER, payload: res.data });
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      } catch (error) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: "I dont know" },
        });
      }
    }
  };
};
