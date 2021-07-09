import { GLOBALTYPES, SUGGESTIONS_TYPE } from "../constant";
import { getDataAPI } from "../../utils/fetchData";

export const getSuggestions = (token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SUGGESTIONS_TYPE.LOADING_SUGGESTIONS, payload: true });

      const res = await getDataAPI(`/suggestions`, token);

      dispatch({
        type: SUGGESTIONS_TYPE.GET_USERS_SUGGESTIONS,
        payload: res.data,
      });

      dispatch({ type: SUGGESTIONS_TYPE.LOADING_SUGGESTIONS, payload: false });
    } catch (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response },
      });
    }
  };
};
