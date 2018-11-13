import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchQuestions, increaseVoteCount, resetVoteCount } from "../../actions/question";
import { fetchAllAnswers } from "../../actions/answer"
import QuizPage from "./quiz-page";
import { nextQuestion } from "../../actions/quiz";
import AppbarClass from "../appbar/appbar-class";
import CircularProgress from '@material-ui/core/CircularProgress';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  state = {
    loadingAnswers: true,
    newQuiz: true,
    voted: false,
    checkForOwner: false,
    owner: false,
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

  componentDidUpdate(prevProps){
    //load the answers for the given question
    if (this.props.activeStep !== this.props.questions.length){
      if (prevProps.activeStep !== this.props.activeStep || this.state.newQuiz){
        this.props.fetchAllAnswers(this.props.questions[this.props.activeStep]._id);
        this.setState({newQuiz:false});
        this.setState({loadingAnswers:false});
      }
    }
    //check the user's quizzes to see if they are the owner of the quiz
    if (this.state.checkForOwner === false && this.props.quizzes){
      this.setState({checkForOwner: true});
      for(let i = 0; i < this.props.quizzes.length; i++){
        if (this.props.quizzes[i] === this.props.match.params.quizId){
          this.setState({owner:true});
        }
      }
    }
  }

  handleNext = () => {
    const { activeStep, nextQuestion, resetVoteCount } = this.props;
    resetVoteCount();
    nextQuestion(activeStep);
    this.setState({loadingAnswers:true});
    this.setState({voted:false});
  };

  handleVote = answerId => {
    this.props.increaseVoteCount();
    //owner can still see the page
    if(this.state.owner === false){
      this.setState({voted:true});
    }
  };

  render() {
    const { questions, activeStep, voteCount, answers, quizzes } = this.props;
    return (
      <div>
      <AppbarClass history={this.props.history} />
      {this.state.loadingAnswers === false && this.state.voted === false &&
        <QuizPage
          questions={questions}
          onClick={this.handleNext}
          activeStep={activeStep}
          vote={this.handleVote}
          voteCount={voteCount}
          answers={answers}
        />
      }
      {this.state.loadingAnswers === true || this.state.voted === true &&
        <CircularProgress />
      }
      </div>
    );
  }
}

Quiz.propTypes = {
  questions: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
  quizzes: PropTypes.array
};

export default connect(
  state => ({
    quizId: state.quiz._id,
    questions: state.question.questions,
    activeStep: state.quiz.activeStep,
    voteCount: state.question.voteCount,
    answers: state.answer.answers,
    quizzes: state.user.quizzes
  }),
  {
    fetchQuestions,
    nextQuestion,
    increaseVoteCount,
    resetVoteCount,
    fetchAllAnswers
  }
)(Quiz);
