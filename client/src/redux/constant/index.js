export const GLOBALTYPES = {
  AUTH: "AUTH",
  ALERT: "ALERT",
  STATUS: "STATUS",
};

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
};

export const POST_TYPES = {
  LOADING_POST: "LOADING_POST",
  CREATE_POST: "CREATE_POST",
  GET_POSTS: "GET_POSTS",
};

export const EditData = (data, id, post) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return newData;
};

export const DeleteData = (data, id, post) => {
  const newData = data.filter((item) => item._id !== id);
  return newData;
};
