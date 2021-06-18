import React, { useState } from "react";

const Carousel = ({ images, id }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <section className="carousel">
      {length > 1 && (
        <>
          <span
            className="carousel-arrow carousel-arrow--left"
            onClick={prevSlide}
          >
            <i className="fas fa-arrow-left"></i>
          </span>
          <span
            className="carousel-arrow carousel-arrow--right"
            onClick={nextSlide}
          >
            <i className="fas fa-arrow-right"></i>
          </span>
        </>
      )}
      {images.map((image, index) => (
        <div
          key={index}
          className={index === current ? "slide active" : "slide"}
        >
          {index === current && <img src={image.url} alt="carousel-img" />}
        </div>
      ))}
    </section>
  );
};

export default Carousel;
