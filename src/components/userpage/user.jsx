import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchQuizzes, deleteQuiz, editQuiz } from "../../actions/quiz";
import UserPage from "./user-page";

class User extends Component {
  constructor(props) {
    super(props);
    this.editRedirect = this.editRedirect.bind(this);
  }

  componentWillMount() {
    this.props.fetchQuizzes();
  }

  editRedirect(quizid) {
    this.props.history.push('/create/' + quizid)
  }

  render() {
    const { quizzes, deleteQuiz, editQuiz, history, editRedirect} = this.props;
    return <UserPage quizzes={quizzes} deleteQuiz={deleteQuiz} editQuiz={editQuiz} history={history} editRedirect={this.editRedirect}/>;
  }
}

User.propTypes = {
  quizzes: PropTypes.array.isRequired,
};

export default connect(
  state => ({
    quizzes: state.quiz.quizzes
  }),
  {
    fetchQuizzes,
    deleteQuiz,
    editQuiz,
  }
)(User);
