import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import AnswerModal from "../userpage/answer-modal";
import { addQuestion, deleteQuestion } from "../../actions/question";
import { midQuizEdit } from "../../actions/question";

class ProctorView extends Component {
    constructor(props){
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleNewQuestion = this.handleNewQuestion.bind(this);
        this.exitProctor = this.exitProctor.bind(this);
    }

    state = {
        open: false,
        newQuestion: false,
        index: -1
    }

    componentDidUpdate(prevProps){
        if(this.state.newQuestion === true && this.props.questions !== prevProps.questions){
            this.setState({newQuestion: false});
            this.handleOpen(this.props.questions.length - 1);
        }
    }

    handleOpen(index){
        this.setState({index:index});
        this.setState({open:true});
    }

    handleClose(){
        this.setState({open:false});
    }

    handleDelete(question){
        this.props.deleteQuestion(question._id, question.parent);
        this.handleClose();
    }

    handleNewQuestion(){
        const newQuestion = {
            questionText: 'New Question'
        }
        this.props.addQuestion(newQuestion, this.props.quizId);
        this.setState({newQuestion:true});
    }

    exitProctor(){
        this.props.onClick(false);
    }

    render(){
        const {onClick, handleExit, activeStep, questions, quizId} = this.props;
        return(
            <span>
            {activeStep !== questions.length ?
                <span>
                    <Button variant="contained" color="primary" onClick={this.exitProctor}>Next </Button>
                    <Button variant="contained" color="primary" onClick={()=>{this.handleOpen(activeStep)}}> View Next Question</Button>
                    <Button variant="contained" color="primary" onClick={this.handleNewQuestion}>Add Question </Button>
                </span>
            :   <span>
                    <Button variant="contained" color="primary" onClick={handleExit}>Exit </Button>
                </span>
            }
            {this.state.open === true &&
                <AnswerModal
                    open={this.state.open}
                    question={questions[this.state.index]}
                    handleClose={this.handleClose}
                    handleDelete={this.handleDelete}
                />
            }
            </span>
        )
    }
}

export default connect(
    state => ({
    }),
    {
        deleteQuestion,
        addQuestion
    }
)(ProctorView);