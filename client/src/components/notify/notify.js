import React from "react";
import { useSelector } from "react-redux";
import Loading from "./loading";

const Notify = () => {
  const { notify } = useSelector((state) => state);

  return <div>{notify.loading && <Loading />}</div>;
};

export default Notify;
