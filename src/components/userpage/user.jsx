import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchQuizzes, deleteQuiz } from "../../actions/quiz";
import UserPage from "./user-page";

class User extends Component {
  componentWillMount() {
    this.props.getQuizzes();
  }

  render() {
    const { quizzes, deleteQuiz } = this.props;
    return <UserPage quizzes={quizzes} deleteQuiz={deleteQuiz} />;
  }
}

User.propTypes = {
  quizzes: PropTypes.array.isRequired
};

export default connect(
  state => ({
    quizzes: state.quiz.quizzes
  }),
  dispatch => ({
    getQuizzes: () => dispatch(fetchQuizzes()),
    deleteQuiz: id => dispatch(deleteQuiz(id))
  })
)(User);
