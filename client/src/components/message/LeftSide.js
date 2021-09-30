import React, { useEffect, useRef, useState } from "react";
import { BsDot } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getConversations } from "../../redux/actions/messageAction";
import { GLOBALTYPES, MESSAGE_TYPES } from "../../redux/constant";
import { getDataAPI } from "../../utils/fetchData";
import UserCard from "../header/UserCard";

const LeftSide = ({ style, className }) => {
  const { auth, message, online } = useSelector((state) => state);
  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [page, setPage] = useState(0);

  const pageEnd = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  // Load-more
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [dispatch, message.resultUsers, page, auth]);

  // Check User Online-Offline
  useEffect(() => {
    if (message.firstLoad)
      dispatch({ type: MESSAGE_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
  }, [online, message.firstLoad, dispatch]);

  // const isActive = (user) => {
  //   if (id === user._id) return "active";
  //   return "";
  // };

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
    dispatch({
      type: MESSAGE_TYPES.ADD_USER,
      payload: { ...user, text: "", media: [] },
    });
    dispatch({ type: MESSAGE_TYPES.CHECK_ONLINE_OFFLINE, payload: online });

    setSearch("");
    setSearchUsers([]);
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
          message.users.map((user, index) => (
            <div
              key={index}
              className="chat-list_user"
              onClick={() => handleAddUser(user)}
            >
              <UserCard user={user}>
                {user.text.length > 12
                  ? `${user.text.substring(0, 12)}...`
                  : user.text}{" "}
                {user.media.length > 0 && (
                  <>
                    {user.media.length} <i className="fas fa-image" />
                  </>
                )}
              </UserCard>

              {user.online ? (
                <BsDot className={`BsDot active`} />
              ) : (
                <BsDot className={`BsDot`} />
              )}
            </div>
          ))}

        {searchUsers.length !== 0 &&
          searchUsers.map((user, index) => (
            <div
              key={index}
              className="chat-list_user"
              onClick={() => handleAddUser(user)}
            >
              <UserCard user={user} />
            </div>
          ))}

        <button ref={pageEnd} style={{ opacity: "0" }}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default LeftSide;
