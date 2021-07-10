import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSuggestions } from "../../redux/actions/suggestionsAction";
import UserCard from "../header/UserCard";
import FollowBtn from "../profile/follow/FollowBtn";
import LoadIcon from "../LoadIcon";

const RightSideBar = () => {
  const dispatch = useDispatch();
  const { auth, suggestions } = useSelector((state) => state);
  const myRef = useRef();

  return (
    <div className="suggestion">
      <UserCard user={auth.user} className="suggestion-auth" />

      <div className="suggestion-reload">
        <h5>Suggestions for you</h5>
        <i
          onMouseDown={() => {
            myRef.current.style["transform"] = "rotate(360deg)";
            myRef.current.style["transition"] = "transform 500ms";
          }}
          onMouseUp={() => {
            myRef.current.style["transform"] = "rotate(-360deg)";
            myRef.current.style["transition"] = "transform 500ms";
          }}
          ref={myRef}
          className="fas fa-redo"
          onClick={() => dispatch(getSuggestions(auth.access_token))}
        />
      </div>

      <div className="suggestion-user">
        {suggestions.loading ? (
          <LoadIcon />
        ) : (
          <>
            {suggestions.users.map((user, index) => (
              <div className="suggestion-user--item" key={index}>
                <UserCard user={user} key={user._id} />
                <FollowBtn user={user} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;
