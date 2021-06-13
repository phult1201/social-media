import { GLOBALTYPES, PROFILE_TYPES } from "../constant";
import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { uploadImage } from "../../utils/imageUpload";

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

export const updateProfileUser = ({ userData, avatar, auth }) => {
  return async (dispatch) => {
    if (!userData.firstname)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please fill first name and last name" },
      });
    try {
      let media;
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (avatar) media = await uploadImage([avatar]);

      const res = await patchDataAPI(
        "/user",
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.access_token
      );

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const follow = ({ users, user, auth }) => {
  return async (dispatch) => {
    const newUser = { ...user, followers: [...user.followers, auth.user] };
    dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });

    try {
      await patchDataAPI(`/user/${user._id}/follow`, null, auth.access_token);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};

export const unfollow = ({ users, user, auth }) => {
  return async (dispatch) => {
    const newUser = {
      ...user,
      followers: user.followers.filter((item) => item._id !== auth.user._id),
    };
    dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: auth.user.following.filter(
            (item) => item._id !== newUser._id
          ),
        },
      },
    });

    try {
      await patchDataAPI(`/user/${user._id}/unfollow`, null, auth.access_token);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
};
