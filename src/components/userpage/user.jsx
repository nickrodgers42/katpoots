import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchQuizzes, deleteQuiz, editQuiz, addQuiz } from "../../actions/quiz";
import UserPage from "./user-page";
import { eventChannel } from "redux-saga";

class User extends Component {
  constructor(props){
    super(props);
    this.handleNewQuiz = this.handleNewQuiz.bind(this);
    this.handleChangeQuiz = this.handleChangeQuiz.bind(this);
  }

  state = {
    newQuizText: '',
    newQuiz: false
  }

  componentWillMount() {
    this.props.fetchQuizzes();
  }

  componentDidUpdate(prevProps){
    if(this.props.quizzes !== prevProps.quizzes && this.state.newQuiz === true){
      console.log(this.props.quizzes);
      this.setState({newQuiz:false});
      this.setState({newQuizText:''});
    }
  }

  handleNewQuiz = () => {
    if(this.state.newQuizText !== ''){
      const newQuiz = {
        title:this.state.newQuizText
      }
      this.props.addQuiz(newQuiz, this.props.user._id);
    }
  }

  handleChangeQuiz = () => event => {
    this.setState({newQuizText:event.target.value});
  }

  render() {
    const { quizzes, deleteQuiz, editQuiz, history} = this.props;
    return <UserPage quizzes={quizzes} deleteQuiz={deleteQuiz} editQuiz={editQuiz} history={history} handleNewQuiz={this.handleNewQuiz} handleChangeQuiz={this.handleChangeQuiz} />;
  }
}

User.propTypes = {
  quizzes: PropTypes.array.isRequired,
};

export default connect(
  state => ({
    quizzes: state.quiz.quizzes,
    user: state.user,
  }),
  {
    fetchQuizzes,
    deleteQuiz,
    editQuiz,
    addQuiz
  }
)(User);
