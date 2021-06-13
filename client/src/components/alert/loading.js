import React from "react";

const Loading = ({ className = "className" }) => {
  return (
    <div className={className}>
      <div className="spinner_overlay">
        <div className="spinner">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
