import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSuggestions } from "../../redux/actions/suggestionsAction";
import UserCard from "../header/UserCard";
import FollowBtn from "../profile/follow/FollowBtn";
import LoadIcon from "../LoadIcon";

const RightSideBar = () => {
  const dispatch = useDispatch();
  const { auth, suggestions } = useSelector((state) => state);

  return (
    <div>
      <UserCard user={auth.user} />

      <div className="">
        <h5>Suggestions for you</h5>
        <i
          className="fas fa-redo"
          onClick={() => dispatch(getSuggestions(auth.access_token))}
        />
      </div>

      {suggestions.loading ? (
        <LoadIcon />
      ) : (
        <div className="suggestions">
          {suggestions.users.map((user) => (
            <UserCard user={user} key={user._id}>
              <FollowBtn user={user} />
            </UserCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
