import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchQuestions, increaseVoteCount, resetVoteCount } from "../../actions/question";
import { fetchAllAnswers } from "../../actions/answer"
import QuizPage from "./quiz-page";
import { nextQuestion } from "../../actions/quiz";
import AppbarClass from "../appbar/appbar-class";
import CircularProgress from '@material-ui/core/CircularProgress';
import { getQuestionIndex, increment, resetIndex } from "../../actions/quiz";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  state = {
    loadingAnswers: true,
    newQuiz: true,
  }

  componentWillMount() {
    const {
      fetchQuestions,
      match: {
        params: { quizId }
      }
    } = this.props;
    fetchQuestions(this.props.quizId || quizId);
    this.props.getQuestionIndex(this.props.match.params.quizId);
  }

  componentDidUpdate(prevProps){
    //load the answers for the given question
    if (this.props.activeStep !== this.props.questions.length && this.props.activeStep !== -1){
      if (prevProps.activeStep !== this.props.activeStep || this.state.newQuiz){
        this.props.fetchAllAnswers(this.props.questions[this.props.activeStep]._id);
        this.setState({newQuiz:false});
      }
    }
    if (this.props.answers !== prevProps.answers){
      this.setState({loadingAnswers:false})
    }
  }

  handleNext = () => {
    const { activeStep, resetVoteCount, nextQuestion } = this.props;
    resetVoteCount();
    if (this.props.activeStep === this.props.questions.length - 1){
      //maybe add another thing in the quiz model called "closed" make it true at this point, and make it false when we click the play button at the very beginning of the quiz
      this.props.resetIndex(this.props.match.params.quizId);
    }
    else{
      this.props.increment(this.props.match.params.quizId, activeStep);
    }
    this.setState({loadingAnswers:true});
    nextQuestion(activeStep);
  };

  handleVote = answerId => {
    this.props.increaseVoteCount();
  };

  render() {
    const { questions, activeStep, voteCount, answers } = this.props;
    console.log(activeStep);
    return (
      <div>
      <AppbarClass history={this.props.history} />
      {this.state.loadingAnswers === false &&
        <QuizPage
          questions={questions}
          onClick={this.handleNext}
          activeStep={activeStep}
          vote={this.handleVote}
          voteCount={voteCount}
          answers={answers}
        />
      }
      {this.state.loadingAnswers === true &&
        <CircularProgress />
      }
      </div>
    );
  }
}

Quiz.propTypes = {
  questions: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired
};

export default connect(
  state => ({
    quizId: state.quiz._id,
    questions: state.question.questions,
    activeStep: state.quiz.activeStep,
    voteCount: state.question.voteCount,
    answers: state.answer.answers
  }),
  {
    fetchQuestions,
    nextQuestion,
    increaseVoteCount,
    resetVoteCount,
    fetchAllAnswers,
    getQuestionIndex,
    increment,
    resetIndex
  }
)(Quiz);
