import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Alert from "./components/alert/alert";
import Header from "./components/Header";
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { refreshtoken } from "./redux/actions/authAction";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshtoken());
  }, [dispatch]);

  return (
    <Router>
      <Alert />
      <div className="App">
        <div className="main">
          {auth.access_token && <Header />}
          <Route exact path="/" component={auth.access_token ? Home : Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/Login" component={Login} />
          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
