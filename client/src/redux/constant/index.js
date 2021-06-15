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

export const EditData = (data, id, post) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return newData;
};

export const DeleteData = (data, id, post) => {
  const newData = data.filter((item) => item._id !== id);
  return newData;
};
