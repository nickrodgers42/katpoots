import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchQuestions, increaseVoteCount, resetVoteCount } from "../../actions/question";
import { fetchAllAnswers } from "../../actions/answer"
import QuizPage from "./quiz-page";
import { nextQuestion } from "../../actions/quiz";
import AppbarClass from "../appbar/appbar-class";
import CircularProgress from '@material-ui/core/CircularProgress';
import { getQuestionIndex, increment, resetIndex, questionClosed, getQuestionStatus } from "../../actions/quiz";
import ProctorView from "./proctor-view"


class Quiz extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleLeaderboardNext = this.handleLeaderboardNext.bind(this);
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
        this.props.fetchAllAnswers(this.props.questions[this.props.activeStep]._id);
        this.setState({newQuiz:false});
      }
    }
    if (this.props.answers !== prevProps.answers){
      this.setState({loadingAnswers:false})
    }
    if(this.state.owner === null && this.props.user.quizzes){
      this.setState({owner:false});
      for (let i in this.props.user.quizzes){
        if(this.props.user.quizzes[i] === this.props.match.params.quizId){
          this.setState({owner: true});
        }
      }
    }
    if(this.state.backFromLeaderboard === true){
      this.setState({loadingAnswers: true});
      this.setState({backFromLeaderboard: false});
      this.props.fetchAllAnswers(this.props.questions[this.props.activeStep]._id);
    }
  }


  handleNext = () => {
    const { activeStep, resetVoteCount, nextQuestion, getQuestionStatus } = this.props;
    this.props.questionClosed(this.props.match.params.quizId, true);
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
    this.setState({leaderboard:true})
  };

  handleVote = answerId => {
    this.props.increaseVoteCount();
  };

  handleLeaderboardNext = () => {
    const {questionClosed} = this.props;
    questionClosed(this.props.match.params.quizId, false);
    this.setState({backFromLeaderboard:true});
  }

  render() {
    const { questions, activeStep, voteCount, answers, closeQuestion } = this.props;
    console.log(closeQuestion);
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
            <ProctorView onClick={this.handleLeaderboardNext} questions={questions} answers={answers} activeStep={activeStep} quizId={this.props.match.params.quizId}/>
          </div>
        }
        {this.state.owner !== true &&
            //display correct answers here
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
    getQuestionStatus
  }
)(Quiz);
