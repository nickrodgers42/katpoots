import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import Register from "./components/register/register";
import ObjList from "./components/item-containers/objList";
import UserPage from "./components/userpage/user-page";

import configureStore from "./store";
import { Provider } from "react-redux";
import App from "./App";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={HomepagePage} />
        <Route path="/register" component={Register} />
        <Route path="/user/list" component={ObjList}/>
        <Route path="/user/" component={UserPage}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
