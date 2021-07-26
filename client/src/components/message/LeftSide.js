import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/constant";
import { useHistory, useParams } from "react-router-dom";
import UserCard from "../header/UserCard";
import { addUser } from "../../redux/actions/messageAction";
import { BsDot } from "react-icons/bs";

const LeftSide = ({ style, className }) => {
  const { auth, message } = useSelector((state) => state);
  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);

    try {
      const res = await getDataAPI(
        `/search?username=${search}`,
        auth.access_token
      );
      setSearchUsers(res.data);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch(addUser({ user, message }));
    return history.push(`/message/${user._id}`);
  };

  return (
    <div className={className} style={style}>
      <form className="left-side__form" onClick={handleSearch}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter to seach..."
        />
        <button type="submit">Search</button>
      </form>

      <div className="left-side__chat-list">
        {searchUsers.length === 0 &&
          message.users.map((user) => (
            <div
              key={user._id}
              className="chat-list_user"
              onClick={() => handleAddUser(user)}
            >
              <UserCard user={user} />
              <BsDot className={`BsDot ${isActive(user)}`} />
            </div>
          ))}

        {searchUsers.length !== 0 &&
          searchUsers.map((user) => (
            <div
              key={user._id}
              className="chat-list_user"
              onClick={() => handleAddUser(user)}
            >
              <UserCard user={user} />
              <BsDot className={`BsDot ${isActive(user)}`} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeftSide;
