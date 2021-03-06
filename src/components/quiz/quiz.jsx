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
import { increaseScore, deleteStudents } from "../../actions/student";
import { start, stop } from "../../actions/timer";
import Typography from "@material-ui/core/Typography";


const styles = {
  loadingContainer: {
    height: "90vh"
  },
  rightWrong: {
    padding: "10px",
    color: "white"
  },
  red: {
    backgroundColor: "#f44336"
  },
  green: {
    backgroundColor: "#4caf50"
  },
  smallerGif: {
    height: "200px"
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
      loadingNextQuestion: false,
      choseCorrectAnswer: null,
      previousAnswers: [],
      startingTime: null,
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
    if(this.props.activeStep !== prevProps.activeStep){
      this.setState({loadingNextQuestion: false})
    }

    if(this.state.backFromLeaderboard === true){
      this.setState({loadingNextQuestion: true});
      this.props.updateAllAnswers(this.props.questions[this.props.activeStep]._id);
      this.setState({backFromLeaderboard:false});
    }
    if(this.props.closeQuestion === false && this.props.loadingAnswers === false && this.props.loadingQuestions === false){
      if(prevProps.loadingAnswers === true || prevProps.loadingQuestions === true){
        if(this.state.owner === true){
          this.props.start();
        }
        else{
          this.setState({choseCorrectAnswer: false});
          this.setState({startingTime: Date.now()});
        }
      }
    }
    if(this.props.timer !== prevProps.timer){
      if(this.props.timer === 0){
        this.handleNext();
      }
    }
  }

  handleNext = () => {
    const { activeStep, resetVoteCount, nextQuestion, increment } = this.props;
    this.setState({previousAnswers: this.props.answers});
    this.props.stop();
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
    this.props.deleteStudents(this.props.match.params.quizId);
    this.props.history.push('/');
  }

  handleVote = answer => {
    if (answer.correctAnswer === true){
      let totalTime = (Date.now() - this.state.startingTime) / 1000;
      let newScore = Math.floor(1000 * (1 - ((totalTime / 20) / 2)));
      this.setState({choseCorrectAnswer: true});
      this.props.increaseScore(this.props.user._id, this.props.user.score + newScore);
    }
    else{
      this.setState({choseCorrectAnswer: false});
    }
    this.props.increaseVoteCount(answer);
  };

  render() {
    const { classes, questions, activeStep, voteCount, answers, closeQuestion, loadingAnswers, loadingQuestions, user, timer } = this.props;
    var redOrGreen = null;
    if (this.state.choseCorrectAnswer !== null) {
      if (this.state.choseCorrectAnswer === true) {
        redOrGreen = classes.green;
      }
      else {
        redOrGreen = classes.red;
      }
    }
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
            user={user}
            timer={timer}
          />
        :
          <Grid container justify="center" alignItems="center" className={classes.loadingContainer}>
            <Grid item>
              <img src={catGif} alt="loading gif of cat"/>
            </Grid>
          </Grid>
        }
        </div>
      }
      {closeQuestion === true &&
        <div>
          {this.state.owner === true && this.state.loadingNextQuestion === false &&
              <ProctorView
                handleExit={this.handleExit}
                onClick={this.handleQuestionStatus}
                questions={questions}
                activeStep={activeStep}
                answers={this.state.previousAnswers}
                quizId={this.props.match.params.quizId}
                answerVoteCount={this.props.answerVoteCount}
              />
          }
          {this.state.owner !== true &&
            <Grid container direction="column" justify="center" alignItems="center" className={[classes.loadingContainer, redOrGreen] }>
              <Grid item>
                {this.state.choseCorrectAnswer === true &&
                  /* Maybe make the background green here and do it like kahoot */
                  <Typography variant="h4" className={classes.rightWrong}>
                    You got it right!
                  </Typography>
                }
                {this.state.choseCorrectAnswer === false &&
                  /* make it red... play a sad sound idk */
                  <Typography variant="h4" className={classes.rightWrong}>
                    You got it wrong :(
                  </Typography>
                }
                <Typography variant="h4" className={classes.rightWrong}>
                  Your score: {user.score}
                </Typography>
              </Grid>
              <Grid item className={classes.smallerGif}>
                <img src={catGif} alt="catgif"/>
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
    user: state.user,
    timer: state.timer,
    answerVoteCount: state.question.answersVotedOn
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
    updateAllAnswers,
    increaseScore,
    deleteStudents,
    start,
    stop
  }
)(withStyles(styles)(Quiz));