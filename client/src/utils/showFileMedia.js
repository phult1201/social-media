export const showFileImage = (src) => {
  return <img src={src} alt="images" />;
};

export const showFileVideo = (src) => {
  return <video controls src={src} alt="video" />;
};
