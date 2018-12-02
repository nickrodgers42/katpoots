import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchQuestions, increaseVoteCount, resetVoteCount, midQuizEdit } from "../../actions/question";
import { fetchAllAnswers, updateAllAnswers } from "../../actions/answer"
import QuizPage from "./quiz-page";
import { nextQuestion } from "../../actions/quiz";
import AppbarClass from "../appbar/appbar-class";
import { getQuestionIndex, increment, resetIndex, questionClosed, getQuestionStatus, changeQuestionStatus } from "../../actions/quiz";
import ProctorView from "./proctor-view"
import catGif from "../../assets/cat.gif"
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";


const styles = {
  loadingContainer: {
    height: "90vh"
  }
}


class Quiz extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleQuestionStatus = this.handleQuestionStatus.bind(this);
  }

  state = {
      owner: null,
      backFromLeaderboard: false,
  };


  componentWillMount() {
    const {
      fetchQuestions,
      match: {
        params: { quizId }
      }
    } = this.props;
    fetchQuestions(this.props.quizId || quizId);
    this.props.getQuestionIndex(this.props.match.params.quizId);
    this.props.getQuestionStatus(this.props.match.params.quizId);
  }

  componentDidUpdate(prevProps){
    //load the answers for the given question
    if (this.props.activeStep !== this.props.questions.length && this.props.activeStep !== -1){
      if (prevProps.activeStep !== this.props.activeStep || this.state.newQuiz){
        this.props.fetchAllAnswers(this.props.questions[this.props.activeStep]._id);
      }
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

    if(this.state.backFromLeaderboard === true){
      this.props.updateAllAnswers(this.props.questions[this.props.activeStep]._id);
      this.setState({backFromLeaderboard:false});
    }
  }

  handleNext = () => {
    const { activeStep, resetVoteCount, nextQuestion, increment } = this.props;
    this.handleQuestionStatus(true);
    resetVoteCount();
    increment(this.props.match.params.quizId, activeStep);
    nextQuestion(activeStep);
  };

  handleQuestionStatus(status){
    const { changeQuestionStatus, questionClosed, midQuizEdit } = this.props;
    questionClosed(this.props.match.params.quizId, status);
    changeQuestionStatus(status);
    if(status === false){
      midQuizEdit(this.props.match.params.quizId);
      this.setState({backFromLeaderboard:true});
    }
  }

  handleExit = () => {
    this.props.history.push('/');
  }

  handleVote = answerId => {
    console.log(this.props.user);
    console.log(answerId);
    this.props.increaseVoteCount();
  };

  render() {
    const { classes, questions, activeStep, voteCount, answers, closeQuestion, loadingAnswers, loadingQuestions } = this.props;
    return (
      <div>
      <AppbarClass history={this.props.history} />
      {closeQuestion === false &&
        <div>
        {loadingAnswers === false && loadingQuestions === false?
          <QuizPage
            questions={questions}
            onClick={this.handleNext}
            activeStep={activeStep}
            vote={this.handleVote}
            voteCount={voteCount}
            answers={answers}
            owner={this.state.owner}
          />
        :
          <Grid container justify="center" alignItems="center" className={classes.loadingContainer}>
            <Grid item>
              <img src={catGif} />
            </Grid>
          </Grid>
        }
        </div>
      }
      {closeQuestion === true &&
        <div>
          {this.state.owner === true &&
            <div>
              <ProctorView handleExit={this.handleExit} onClick={this.handleQuestionStatus} questions={questions} activeStep={activeStep} quizId={this.props.match.params.quizId}/>
            </div>
          }
          {this.state.owner !== true &&
            <Grid container justify="center" alignItems="center" className={classes.loadingContainer}>
              <Grid item>
                <img src={catGif} />
              </Grid>
            </Grid>
          }
        </div>
      }
      </div>
    );
  }
}

Quiz.propTypes = {
  questions: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
  loadingAnswers: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  state => ({
    quizId: state.quiz._id,
    questions: state.question.questions,
    activeStep: state.quiz.activeStep,
    voteCount: state.question.voteCount,
    answers: state.answer.answers,
    loadingAnswers: state.answer.loadingAnswers,
    loadingQuestions: state.question.loadingQuestions,
    closeQuestion: state.quiz.closeQuestion,
    user: state.user
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
)(withStyles(styles)(Quiz));