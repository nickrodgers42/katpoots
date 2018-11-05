import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAnswerIfNeeded } from "../../actions/answer";
import AnswerCard from "./answer-card";

class Answer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, answerId } = this.props;
    dispatch(fetchAnswerIfNeeded(answerId));
  }

  componentDidUpdate(prevProps) {
    if (this.props.answerId === prevProps.answerId) return;
    const { dispatch, answerId } = this.props;
    dispatch(fetchAnswerIfNeeded(answerId));
  }

  handleChange(nextAnswerId) {
    this.props.dispatch(fetchAnswerIfNeeded(nextAnswerId));
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { dispatch, answerId } = this.props;
    dispatch(fetchAnswerIfNeeded(answerId));
  }

  render() {
    const { answer, vote } = this.props;
    return (
      <div>
        <AnswerCard answer={answer} vote={vote} />
      </div>
    );
  }
}

Answer.propTypes = {
  answer: PropTypes.object,
  answerId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired
};

export default connect(state => {
  return { answer: state.answer };
})(Answer);
