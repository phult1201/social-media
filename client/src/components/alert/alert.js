import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/constant";
import Loading from "./Loading";
import Toast from "./Toast";

const Notify = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const removeToast = setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 3000);
    return () => {
      clearTimeout(removeToast);
    };
  }, [alert.error, alert.success, dispatch]);

  return (
    <>
      {alert.loading && <Loading />}

      {alert.error && (
        <Toast
          msg={{
            title: "Error",
            body: alert.error,
            color: "#dc143c",
            icon: "dangerous",
          }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
        />
      )}

      {alert.success && (
        <Toast
          msg={{
            title: "Success",
            body: alert.success,
            color: "#61b15a",
            icon: "check_circle",
          }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
        />
      )}
    </>
  );
};

export default Notify;
