import React, { useEffect, useRef } from "react";

const OutsideAlerter = ({ children, setShowDropdown }) => {
  const wrapperRef = useRef();

  useEffect(() => {
    function handleClickOutSide(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [wrapperRef, setShowDropdown]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideAlerter;
