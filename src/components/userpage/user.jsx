import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchQuizzes, deleteQuiz, editQuiz } from "../../actions/quiz";
import UserPage from "./user-page";

class User extends Component {
  componentWillMount() {
    this.props.fetchQuizzes();
  }

  render() {
    const { quizzes, deleteQuiz, editQuiz, history} = this.props;
    return <UserPage quizzes={quizzes} deleteQuiz={deleteQuiz} editQuiz={editQuiz} history={history} />;
  }
}

User.propTypes = {
  quizzes: PropTypes.array.isRequired
};

export default connect(
  state => ({
    quizzes: state.quiz.quizzes
  }),
  {
    fetchQuizzes,
    deleteQuiz,
    editQuiz
  }
)(User);
