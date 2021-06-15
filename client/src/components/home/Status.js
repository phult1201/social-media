import React from "react";
import Avatar from "../avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/constant";

const Status = () => {
  const distpatch = useDispatch();
  const { auth } = useSelector((state) => state);

  return (
    <div className="status">
      <Avatar avaImg={auth.user.avatar} avaSize="small" />
      <button
        className="status-btn"
        onClick={() => distpatch({ type: GLOBALTYPES.STATUS, payload: true })}
      >
        {" "}
        {auth.user.lastname}, What are you thinking?{" "}
      </button>
    </div>
  );
};

export default Status;
