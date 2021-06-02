import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/constant";
import Loading from "./loading";
import Toast from "./toast";

const Notify = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      {alert.loading && <Loading />}

      {alert.error && (
        <Toast
          msg={{ title: "Error", body: alert.error }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor="bg-danger"
        />
      )}

      {alert.success && (
        <Toast
          msg={{ title: "Success", body: alert.success }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor="bg-success"
        />
      )}
    </>
  );
};

export default Notify;
