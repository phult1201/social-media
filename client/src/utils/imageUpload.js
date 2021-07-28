export const checkImage = (file) => {
  let error = "";

  if (!file) return (error = "File does not exists.");

  if (file.size > 1024 * 1024 * 50)
    return (error = "The file largest is 50 MB.");

  // if (file.type !== "image/jpeg" && file.type !== "image/png")
  //   return (error = "Image format is incorrect.");

  return error;
};

export const uploadImage = async (images) => {
  let imgArr = [];
  for (const image of images) {
    const formData = new FormData();
    if (image.camera) {
      formData.append("file", image.camera);
    } else {
      formData.append("file", image);
    }
    formData.append("upload_preset", "bcimgfqy");
    formData.append("cloud_name", "ltfu");

    const res = await fetch("https://api.cloudinary.com/v1_1/ltfu/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  console.log(imgArr);
  return imgArr;
};
