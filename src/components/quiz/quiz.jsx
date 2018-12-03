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
      loadingNextQuestion: false,
      choseCorrectAnswer: null
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
    this.props.deleteStudents(this.props.match.params.quizId);
    this.props.history.push('/');
  }

  handleVote = answer => {
    if (answer.correctAnswer === true){
      this.setState({choseCorrectAnswer: true});
      this.props.increaseScore(this.props.user._id, this.props.user.score + 100);
    }
    else{
      this.setState({choseCorrectAnswer: false});
    }
    this.props.increaseVoteCount();
  };

  render() {
    const { classes, questions, activeStep, voteCount, answers, closeQuestion, loadingAnswers, loadingQuestions, increaseScore, user } = this.props;
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
            <div>
              <ProctorView handleExit={this.handleExit} onClick={this.handleQuestionStatus} questions={questions} activeStep={activeStep} quizId={this.props.match.params.quizId}/>
            </div>
          }
          {this.state.owner !== true &&
            <Grid container justify="center" alignItems="center" className={classes.loadingContainer}>
              <Grid item>
                {this.state.choseCorrectAnswer === true &&
                  /* Maybe make the background green here and do it like kahoot */
                  <h1> You got it right! </h1>
                }
                {this.state.choseCorrectAnswer === false &&
                  /* make it red... play a sad sound idk */
                  <h1> You got it wrong :( </h1>
                }
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
    updateAllAnswers,
    increaseScore,
    deleteStudents
  }
)(withStyles(styles)(Quiz));