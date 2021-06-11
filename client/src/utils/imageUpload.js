export const checkImage = (file) => {
  let error = "";

  if (!file) return (error = "File does not exists.");

  if (file.size > 1024 * 1024) return (error = "Image size is too large.");

  if (file.type !== "image/jpeg" && file.type !== "image/png")
    return (error = "Image format is incorrect.");

  return error;
};

export const uploadImage = async (images) => {
  let imgArr = [];
  for (const image of images) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "bcimgfqy");
    formData.append("cloud_name", "ltfu");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/ltfu/image/upload",
      { method: "POST", body: formData }
    );
    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }

  return imgArr;
};
