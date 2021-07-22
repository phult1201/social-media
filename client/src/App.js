import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { refreshtoken } from "./redux/actions/authAction";
import StatusModal from "./components/home/StatusModal";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import io from "socket.io-client";
import { GLOBALTYPES } from "./redux/constant";
import SocketClient from "./SocketClient";
import { getNotifies } from "./redux/actions/notifyAction";

function App() {
  const { auth, status } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshtoken());
    const socket = io("http://localhost:3000");
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });

    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.access_token) {
      dispatch(getPosts(auth.access_token));
      dispatch(getSuggestions(auth.access_token));
      dispatch(getNotifies(auth.access_token));
    }
  }, [dispatch, auth.access_token]);

  return (
    <Router>
      <Alert />
      <div className="App">
        {auth.access_token && <Header />}
        <div className="wrap_main">
          {status && <StatusModal />}
          {auth.access_token && <SocketClient />}
          <div className="main">
            <Route
              exact
              path="/"
              component={auth.access_token ? Home : Login}
            />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRouter exact path="/:page" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={PageRender} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
