import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/constant";
import Overlay from "../overlay/Overlay";

const StatusModal = () => {
  const { auth } = useSelector((state) => state);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  return (
    <Overlay>
      <div className="status_modal">
        <form className="status_modal-form">
          <div className="status_modal-form-header">
            <h5>Create Post</h5>
            <i
              className="fas fa-times"
              onClick={() =>
                dispatch({ type: GLOBALTYPES.STATUS, payload: false })
              }
            />
          </div>

          <div className="status_modal-form-body">
            <textarea
              placeholder={`${auth.user.lastname}, what are you thinking`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="upload">
              <i className="fas fa-camera upload-camera" />
              <div className="upload-image">
                <i className="fas fa-image" />
                <input
                  type="file"
                  name="file"
                  id="file"
                  multiple
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <div className="status_modal-form-footer">
            <button>Post</button>
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default StatusModal;
