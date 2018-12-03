import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkForUser } from "./actions/user";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomepagePage from "./components/homepage/homepagePage";
import Register from "./components/register/register";
import Login from "./components/login/login";
import User from "./components/userpage/user";
import Pin from "./components/pinpage/pin";
import Quiz from "./components/quiz/quiz";
import QuestionsList from "./components/userpage/questions-list";

class App extends Component {
  constructor(props) {
    super(props);
    this.checkForUser = this.checkForUser.bind(this);
  }

  componentDidMount() {
    this.checkForUser();
    document.title = "KatPoots";
  }

  checkForUser() {
    this.props.dispatch(checkForUser());
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomepagePage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/user" component={User} />
          <Route path="/quiz/:quizId" component={Quiz} />
          <Route path="/pin/:quizId" component={Pin}/>
          <Route path="/create/:quizId" component={QuestionsList} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(App);
