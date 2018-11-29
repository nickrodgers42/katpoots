import React, { Component } from "react";
import { connect } from "react-redux";
import Homepage from "./homepage";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/user";
import { joinQuiz, setQuiz } from "../../actions/quiz";

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

  logout() {
    this.props.logoutUser();
  }

  joinQuizAndRedirect(values) {
    this.props.joinQuiz(values);
    this.props.history.push(`/pin/${this.props.quizId}`);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Homepage
          logout={this.logout}
          history={this.props.history}
          joinQuiz={this.joinQuizAndRedirect}
          user={user}
          setQuiz={this.props.setQuiz}
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
      quizId: state.quiz.currentQuiz._id
    };
  },
  {
    joinQuiz,
    logoutUser,
    setQuiz
  }
)(HomepagePage);
