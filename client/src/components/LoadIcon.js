import React from "react";

const LoadIcon = ({ style }) => {
  return (
    <div className="load-icon" style={{ ...style }}>
      <div className="spinner-icon">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadIcon;
