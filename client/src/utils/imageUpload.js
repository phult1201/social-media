export const checkImage = (file) => {
  let error = "";

  if (!file) return (error = "File does not exists.");

  if (file.size > 1024 * 1024) return (error = "Image size is too large.");

  if (file.type !== "image/jpeg" && file.type !== "image/png")
    return (error = "Image format is incorrect.");

  return error;
};
