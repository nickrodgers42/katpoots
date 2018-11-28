import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PinPage from "./pin-page";
import Grid from '@material-ui/core/Grid'
import { fetchQuiz } from "../../actions/quiz";

class Pin extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loadingPin: true,
    usersConnected: false
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
  }

  render() {
    const { currentQuiz } = this.props;
    return (
      <div>
        {this.state.loadingPin === false &&
          <PinPage history={this.props.history} currentQuiz={currentQuiz} />
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    currentQuiz: state.quiz.currentQuiz,
  }),
  {
    fetchQuiz
  }
)(Pin); //connect()(Pin);
