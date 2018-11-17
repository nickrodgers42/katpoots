import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import QuestionComponent from "./question";

class Question extends Component {
    constructor(props) {
        super(props);
        this.questionAnswered = this.questionAnswered.bind(this);
    }

    state = {
        answered: false
    }

    questionAnswered() {
        this.state.answered = true
    }

    render() {
        const { question, vote, voteCount, answers } = this.props;        
        return(
            <div>
                <QuestionComponent 
                    question={question}
                    vote={vote}
                    voteCount={voteCount}
                    answers={answers}
                    answered={this.state.answered}
                    questionAnswered = {this.questionAnswered}
                />
            </div>
        );
    }
}

export default (Question);