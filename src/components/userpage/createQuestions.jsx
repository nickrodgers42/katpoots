import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchQuestions, editQuestion } from "../../actions/question";
import Button from '@material-ui/core/Button';
import QuestionModal from './QuestionModal'
import { timingSafeEqual } from "crypto";
import { fetchAllAnswers } from "../../actions/answer";

class CreateQuestions extends Component {
    constructor(props){
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentWillMount(){
        const {
            fetchAllAnswers,
            fetchQuestions,
            match: {
                params: {quizId}
            }
        } = this.props;
        fetchAllAnswers(this.props.quizId || quizId);
        fetchQuestions(this.props.quizId || quizId);
    }

    state = {
        open: false,
    }

    handleOpen = (question) => {
        this.setState({open : true});
        this.setState({question: question});
    }

    handleClose = () => {
        this.setState({ open : false});
    }

    handleSave = (question) =>{
        this.setState({ open: false});
        if (question){
            let questionText = this.state.question.questionText
            const newQuestion = {
                questionText:questionText
            }
            this.props.editQuestion(newQuestion, question._id, question.parent);
        }
    }

    handleChange = question => event => {
        this.setState({
            question:{
                _id:question._id,
                questionText:event.target.value,
                parent: question.parent
            }
        })
    } 

    render(){
        console.log(this.props);
        const {questions, answers} = this.props;
        return( 
            <div>
                <Button
                onClick={() => {this.handleOpen(null)}}>
                Add Question
                </Button>
                {questions ? questions.map(question => (
                    <div onClick={()=>{this.handleOpen(question)}}> {question.questionText} </div>
                )):null}
                <QuestionModal
                    handleClose={this.handleClose}
                    open={this.state.open}
                    question={this.state.question}
                    handleChange={this.handleChange}
                    handleSave={this.handleSave}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        questions: state.question.questions,
        answers: state.answer.answers
    }),
    {
        fetchQuestions,
        fetchAllAnswers,
        editQuestion
    }
)(CreateQuestions);