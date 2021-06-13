import React from "react";

const Overlay = ({ children, className = "className" }) => {
  return <div className={`overlay ${className}`}>{children}</div>;
};

export default Overlay;
