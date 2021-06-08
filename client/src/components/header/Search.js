import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/constant";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (search) {
        getDataAPI(`search?username=${search}`, auth.access_token)
          .then((res) => setUsers(res.data))
          .catch((error) => {
            dispatch({
              type: GLOBALTYPES.ALERT,
              payload: { error: error.response.data.msg },
            });
          });
      }
    }, 1000);

    return () => {
      setUsers([]);
      clearTimeout(timeOutId);
    };
  }, [search, auth.access_token, dispatch]);

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <form className="search_form">
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
      />

      {!search && (
        <div className="search_form-icon">
          <span className="material-icons">search</span>
          <span>Search</span>
        </div>
      )}

      {search && (
        <div className="search_form-close" onClick={handleClose}>
          &times;
        </div>
      )}

      {search && (
        <div className="search_form-users">
          {users.map((user) => {
            return (
              <Link
                key={user._id}
                to={`/profile/${user._id}`}
                onClick={handleClose}
              >
                <UserCard user={user} />
              </Link>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default Search;
