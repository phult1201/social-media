export const GLOBALTYPES = {
  AUTH: "AUTH",
  ALERT: "ALERT",
  STATUS: "STATUS",
  MODAL: "MODAL",
  SOCKET: "SOCKET",
};

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
  GET_PROFILE_USER: "GET_PROFILE_USER",
  GET_PROFILE_POSTS: "GET_PROFILE_POSTS",
  UPDATE_PROFILE_POSTS: "UPDATE_PROFILE_POSTS",
  GET_PROFILE_ID: "GET_PROFILE_ID",
};

export const POST_TYPES = {
  LOADING_POST: "LOADING_POST",
  CREATE_POST: "CREATE_POST",
  UPDATE_POST: "UPDATE_POST",
  GET_POSTS: "GET_POSTS",
  GET_POST: "GET_POST",
  DELETE_POST: "DELETE_POST",
};

export const DISCOVER_TYPES = {
  LOADING: "LOADING",
  GET_DISCOVER_POSTS: "GET_DISCOVER_POSTS",
  UPDATE_DISCOVER_POSTS: "UPDATE_DISCOVER_POSTS",
};

export const SUGGESTIONS_TYPE = {
  LOADING_SUGGESTIONS: "LOADING_SUGGESTIONS",
  GET_USERS_SUGGESTIONS: "GET_USERS_SUGGESTIONS",
};

export const EditData = (data, id, post) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return newData;
};

export const DeleteData = (data, id, post) => {
  const newData = data.filter((item) => item._id !== id);
  return newData;
};
