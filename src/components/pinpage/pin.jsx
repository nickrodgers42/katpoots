import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PinPage from "./pin-page";
import Grid from '@material-ui/core/Grid'
import { fetchQuiz } from "../../actions/quiz";
import catGif from "../../assets/cat.gif"

class Pin extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loadingPin: true,
    usersConnected: false,
    owner: null
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

  componentDidUpdate(prevProps) {
    if (this.props.currentQuiz !== prevProps.currentQuiz){
      this.setState({loadingPin: false});
    }
    if (this.state.owner === null && this.props.user.quizzes){
      this.setState({owner: false});
      for (let i in this.props.user.quizzes){
        if(this.props.user.quizzes[i] === this.props.match.params.quizId){
          this.setState({owner: true});
        }
      }
    }
  }

  render() {
    const { currentQuiz } = this.props;
    return (
      <div>
        {this.state.owner === true ?
          <div>
            {this.state.loadingPin === false &&
              <PinPage history={this.props.history} currentQuiz={currentQuiz} />
            }
          </div>
        : 
          <div>
            <h1> Welcome! </h1>
            <img src={catGif}></img>
          </div>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    currentQuiz: state.quiz.currentQuiz,
    user: state.user
  }),
  {
    fetchQuiz
  }
)(Pin); //connect()(Pin);
