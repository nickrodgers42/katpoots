import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchQuestions, increaseVoteCount, resetVoteCount, midQuizEdit } from "../../actions/question";
import { fetchAllAnswers, updateAllAnswers } from "../../actions/answer"
import QuizPage from "./quiz-page";
import { nextQuestion } from "../../actions/quiz";
import AppbarClass from "../appbar/appbar-class";
import CircularProgress from '@material-ui/core/CircularProgress';
import { getQuestionIndex, increment, resetIndex, questionClosed, getQuestionStatus, changeQuestionStatus } from "../../actions/quiz";
import ProctorView from "./proctor-view"


class Quiz extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleLeaderboardNext = this.handleLeaderboardNext.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  state = {
    loadingAnswers: true,
    newQuiz: true,
    owner: null,
    backFromLeaderboard: false,
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
    this.props.getQuestionStatus(this.props.match.params.quizId)
  }


  componentDidUpdate(prevProps){
    //load the answers for the given question
    if (this.props.activeStep !== this.props.questions.length && this.props.activeStep !== -1){
      if (prevProps.activeStep !== this.props.activeStep || this.state.newQuiz){
        this.setState({loadingAnswers:true});
        this.props.fetchAllAnswers(this.props.questions[this.props.activeStep]._id);
        this.setState({newQuiz:false});
      }
    }
    if (this.props.answers !== prevProps.answers){
      //reload the answers when you get back from the leaderboard and dispatch them so everyone sees the edited questions
      if (this.state.backFromLeaderboard === true){
        this.props.questionClosed(this.props.match.params.quizId, false);
        this.props.changeQuestionStatus(false);
        this.setState({backFromLeaderboard: false});
      }
      this.setState({loadingAnswers:false})
    }
    //check to see if the current user is the owner of the quiz
    if(this.state.owner === null && this.props.user.quizzes){
      this.setState({owner:false});
      for (let i in this.props.user.quizzes){
        if(this.props.user.quizzes[i] === this.props.match.params.quizId){
          this.setState({owner: true});
        }
      }
    }
    //refetch the answers after returning from the leaderboard, because adding a question mid quiz pulls in the answers to that question in the answer state
    if(this.state.backFromLeaderboard === true && this.state.loadingAnswers === false){
      this.setState({loadingAnswers: true});
      this.props.updateAllAnswers(this.props.questions[this.props.activeStep]._id);
    }
  }


  handleNext = () => {
    const { activeStep, resetVoteCount, nextQuestion, changeQuestionStatus, questionClosed, increment } = this.props;
    questionClosed(this.props.match.params.quizId, true);
    changeQuestionStatus(true);
    resetVoteCount();
    increment(this.props.match.params.quizId, activeStep);
    nextQuestion(activeStep);
    this.setState({leaderboard:true})
  };

  handleVote = answerId => {
    this.props.increaseVoteCount();
  };

  handleLeaderboardNext = () => {
    const {midQuizEdit} = this.props;
    midQuizEdit(this.props.match.params.quizId);
    this.setState({backFromLeaderboard:true});
  }

  handleExit = () => {
    const {questionClosed, resetIndex} = this.props;
    questionClosed(this.props.match.params.quizId, false);
    resetIndex(this.props.match.params.quizId);
  }

  render() {
    const { questions, activeStep, voteCount, answers, closeQuestion } = this.props;
    return (
      <div>
      <AppbarClass history={this.props.history} />
      {closeQuestion === false &&
        <div>
          {this.state.loadingAnswers === false &&
            <QuizPage
              questions={questions}
              onClick={this.handleNext}
              activeStep={activeStep}
              vote={this.handleVote}
              voteCount={voteCount}
              answers={answers}
              owner={this.state.owner}
            />
          }
          {this.state.loadingAnswers === true &&
            <CircularProgress />
          }
        </div>
      }
      {closeQuestion === true &&
        <div>
        {this.state.owner === true &&
          <div>
            <h2> leaderboard or something... </h2>
            <ProctorView onClick={this.handleLeaderboardNext} questions={questions} answers={answers} activeStep={activeStep} quizId={this.props.match.params.quizId} handleExit={this.handleExit}/>
          </div>
        }
        {this.state.owner !== true &&
            //this pops up for everyone except the proctor when he clicks next. Maybe display the correct answers or if they got it right or something like that
            <CircularProgress />
        }
        </div>
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
    answers: state.answer.answers,
    user: state.user,
    closeQuestion: state.quiz.closeQuestion
  }),
  {
    fetchQuestions,
    nextQuestion,
    increaseVoteCount,
    resetVoteCount,
    fetchAllAnswers,
    getQuestionIndex,
    increment,
    resetIndex,
    questionClosed,
    getQuestionStatus,
    changeQuestionStatus,
    midQuizEdit,
    updateAllAnswers
  }
)(Quiz);
