import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import HomepagePage from "./components/homepage/homepagePage";
import registerServiceWorker from "./registerServiceWorker";
import Register from "./components/register/register";
import Login from "./components/login/login";
import configureStore from "./store";
import { Provider } from "react-redux";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={HomepagePage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
