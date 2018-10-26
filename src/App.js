import React, { Component } from "react";
import { Provider } from "react-redux";
import logo from "./logo.svg";
import configureStore from "./store";
import Answer from "./components/answer/answer";
import "./App.css";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Answer answerId="5bd291001e3bd8ee5079cc1b" />
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </Provider>
    );
  }
}

export default App;
