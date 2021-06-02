import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Alert from "./components/alert/alert";
import PageRender from "./PageRender";
import Login from "./pages/login";
import Home from "./pages/home";
import { useEffect } from "react";
import { refreshtoken } from "./redux/actions/authAction";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshtoken());

    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Alert />
      <div className="App">
        <div className="main">
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
