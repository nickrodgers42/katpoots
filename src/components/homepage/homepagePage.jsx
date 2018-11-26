import React, { Component } from "react";
import { connect } from "react-redux";
import Homepage from "./homepage";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/user";
import { joinQuiz, setQuizId } from "../../actions/quiz";

class HomepagePage extends Component {
  constructor(props) {
    super(props);
    this.signUpRedirect = this.signUpRedirect.bind(this);
    this.loginRedirect = this.loginRedirect.bind(this);
    this.logout = this.logout.bind(this);
    this.joinQuizAndRedirect = this.joinQuizAndRedirect.bind(this);
  }

  signUpRedirect() {
    this.props.history.push("/register");
  }

  loginRedirect() {
    this.props.history.push("/login");
  }

  joinQuizAndRedirect(values) {
    this.props.joinQuiz(values);
    this.props.history.push(`/quiz/${this.props.quizId}`);
  }

  logout() {
    this.props.logoutUser();
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Homepage
          logout={this.logout}
          history={this.props.history}
          joinQuiz={this.props.joinQuizAndRedirect}
          user={user}
          setQuizId={this.props.setQuizId}
        />
      </div>
    );
  }
}

HomepagePage.propTypes = {
  user: PropTypes.object
};

export default connect(
  state => {
    return {
      user: state.user,
      quizId: state.quiz.quizId
    };
  },
  {
    joinQuiz,
    logoutUser,
    setQuizId
  }
)(HomepagePage);
