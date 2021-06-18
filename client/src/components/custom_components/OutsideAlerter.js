import React, { useEffect, useRef } from "react";

function useOutSideAlerter(ref, setShowDropdown) {
  useEffect(() => {
    function handleClickOutSide(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [ref, setShowDropdown]);
}

const OutsideAlerter = ({ children, setShowDropdown }) => {
  const wrapperRef = useRef();
  useOutSideAlerter(wrapperRef, setShowDropdown);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideAlerter;
