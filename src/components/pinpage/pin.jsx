import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PinPage from "./pin-page";
import { fetchQuiz, questionClosed, resetIndex } from "../../actions/quiz";
import { fetchStudents } from "../../actions/student";

class Pin extends Component {
  constructor(props) {
    super(props);
    this.startQuiz = this.startQuiz.bind(this);
    this.toggleMusic = this.toggleMusic.bind(this);
  }

  state = {
    loadingPin: true,
    usersConnected: false,
    owner: null,
    playing: true,
  };

  componentWillMount() {
    const {
      fetchQuiz,
      match: {
        params: { quizId }
      }
    } = this.props;
    fetchQuiz(this.props.quizId || quizId);
  }

  componentDidMount(){
    this.props.fetchStudents(this.props.match.params.quizId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentQuiz !== prevProps.currentQuiz){
      this.setState({loadingPin: false});
      this.props.questionClosed(this.props.currentQuiz._id, true);
      this.props.resetIndex(this.props.currentQuiz._id);
    }
    if(this.state.owner === null && this.props.user.quizzes){
      this.setState({owner:false});
      for (let i in this.props.user.quizzes){
        if(this.props.user.quizzes[i] === this.props.match.params.quizId){
          this.setState({owner: true});
        }
      }
    }
  }

  toggleMusic() {
    this.setState({playing: !this.state.playing})
    // console.log(this.state.playing)
  }

  startQuiz(){
    this.props.history.push(`/quiz/${this.props.currentQuiz._id}`);
  }

  render() {
    const { currentQuiz, students} = this.props;
    return (
      <div>
        {this.state.owner === true &&
          <div>
            {this.state.loadingPin === false &&
              <PinPage
                history={this.props.history}
                currentQuiz={currentQuiz}
                startQuiz={this.startQuiz}
                students={students}
                toggleMusic={this.toggleMusic}
                playing={this.state.playing}
              />
            }
          </div>
        }
      </div>
    );
  }
}

Pin.propTypes = {
  history: PropTypes.object.isRequired,
  currentQuiz: PropTypes.object.isRequired
}

export default connect(
  state => ({
    currentQuiz: state.quiz.currentQuiz,
    user: state.user,
    students: state.quiz.users,
  }),
  {
    fetchQuiz,
    questionClosed,
    resetIndex,
    fetchStudents
  }
)(Pin);
