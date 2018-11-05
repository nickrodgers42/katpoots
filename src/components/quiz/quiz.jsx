import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchQuestions, increaseVoteCount, resetVoteCount } from "../../actions/question";
import QuizPage from "./quiz-page";
import { nextQuestion } from "../../actions/quiz";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  componentWillMount() {
    const {
      fetchQuestions,
      match: {
        params: { quizId }
      }
    } = this.props;
    fetchQuestions(this.props.quizId || quizId);
  }

  handleNext = () => {
    const { activeStep, nextQuestion, resetVoteCount } = this.props;
    resetVoteCount();
    nextQuestion(activeStep);
  };

  handleVote = answerId => {
    this.props.increaseVoteCount();
  };

  render() {
    const { questions, activeStep, voteCount } = this.props;
    return (
      <QuizPage
        questions={questions}
        onClick={this.handleNext}
        activeStep={activeStep}
        vote={this.handleVote}
        voteCount={voteCount}
      />
    );
  }
}

Quiz.propTypes = {
  questions: PropTypes.array.isRequired
};

export default connect(
  state => ({
    quizId: state.quiz._id,
    questions: state.question.questions,
    activeStep: state.quiz.activeStep,
    voteCount: state.question.voteCount
  }),
  {
    fetchQuestions,
    nextQuestion,
    increaseVoteCount,
    resetVoteCount
  }
)(Quiz);
