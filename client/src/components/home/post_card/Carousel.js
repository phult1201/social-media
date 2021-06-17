import React from "react";

const Carousel = ({ images, id }) => {
  return (
    <div>
      {images.map((image) => (
        <img
          src={image.url}
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
          alt="carousel-img"
        />
      ))}
    </div>
  );
};

export default Carousel;
