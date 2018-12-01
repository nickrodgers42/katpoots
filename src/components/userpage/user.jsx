import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchQuizzes, deleteQuiz, editQuiz, addQuiz } from "../../actions/quiz";
import UserPage from "./user-page";

class User extends Component {
  constructor(props){
    super(props);
    this.handleNewQuiz = this.handleNewQuiz.bind(this);
    this.handleChangeQuiz = this.handleChangeQuiz.bind(this);
    this.editRedirect = this.editRedirect.bind(this);
    this.pinRedirect = this.pinRedirect.bind(this);
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

  editRedirect(quizid) {
    this.props.history.push("/create/" + quizid);
    window.location.reload();
  }

  pinRedirect(quizid) {
    this.props.history.push("/pin/" + quizid);;
    window.location.reload();
  }

  render() {
    const { quizzes, deleteQuiz, editQuiz, history} = this.props;//, editRedirect} = this.props;
    return (
      <UserPage
        quizzes={quizzes}
        deleteQuiz={deleteQuiz}
        editQuiz={editQuiz}
        history={history}
        editRedirect={this.editRedirect}
        handleNewQuiz={this.handleNewQuiz}
        handleChangeQuiz={this.handleChangeQuiz}
        pinRedirect={this.pinRedirect}
      />
    );
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
