import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import QuestionModal from "../userpage/QuestionModal"
import { fetchAllAnswers, editAnswer, addAnswer, deleteAnswer } from "../../actions/answer";
import { editQuestion, addQuestion, deleteQuestion } from "../../actions/question";

class ProctorView extends Component {
    constructor(props){
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    
    state = {
        open:false,
        questionText: '',
        newQuestion: false,
        loading:true,
        answers: [
            {
                answerText: '',
                correctAnswer: false,
            },
            {
                answerText: '',
                correctAnswer: false,
            },
            {
                answerText: '',
                correctAnswer: false,
            },
            {
                answerText: '',
                correctAnswer: false,
            }
        ],
    }

    componentDidUpdate(prevProps){
        if(this.props.questions !== prevProps.questions && this.state.newQuestion === true){
            this.setState({index: this.props.questions.length - 1});
            this.setState({newQuestion:false});
            this.props.fetchAllAnswers(this.props.questions[this.props.questions.length - 1]._id);
        }
        if(this.props.answers !== prevProps.answers && this.state.open === true){
            for(let i = 0; i < this.props.answers.length; i++){
                let newAnswers = [...this.state.answers];
                newAnswers[i].answerText = this.props.answers[i].answerText;
                newAnswers[i].correctAnswer = this.props.answers[i].correctAnswer;
                this.setState({answers: newAnswers});
            }
            this.setState({loading:false});
        }
    } 

    handleOpen = index => {
        this.setState({open:true});
        if(index >= 0){
            this.props.fetchAllAnswers(this.props.questions[index]._id);
            this.setState({index:index});
        }
        else{
            this.setState({newQuestion: true});
            const newQuestion = {
                questionText: 'New Question'
            }
            this.props.addQuestion(newQuestion, this.props.quizId);
        }
    }

    handleClose = () => {
        this.setState({questionText: ''});
        for(let i = 0; i < this.state.answers.length; i++){
            let newAnswers = [...this.state.answers];
            newAnswers[i].answerText = ''
            newAnswers[i].correctAnswer = false
            this.setState({answers: newAnswers});
        }
        this.setState({open:false})
        this.setState({loading: true});
    }

    handleChange = question => event => {
        this.setState({questionText:event.target.value});
    }

    handleChangeAnswer = (index) => event => {
        let newAnswers = [...this.state.answers];
        newAnswers[index].answerText = event.target.value;
        this.setState({answers: newAnswers});
    }

    handleCheck = (index) => event =>{
        let newAnswers = [...this.state.answers];
        newAnswers[index].correctAnswer = event.target.checked;
        this.setState({answers: newAnswers});
    }

    handleDelete = (question) => {
        this.props.deleteQuestion(question._id, question.parent);
        this.handleClose();
    }

    handleSave = (question, answers) =>{
        if (question){
            if(this.state.questionText !== question.questionText && this.state.questionText !== ''){
                const editedQuestion = {
                    questionText: this.state.questionText
                }
                this.props.editQuestion(editedQuestion, question._id, question.parent);
            }
            for(let i = 0; i < this.state.answers.length; i++){
                if (answers[i]){
                    if(this.state.answers[i].answerText !== answers[i].answerText || this.state.answers[i].correctAnswer !== answers[i].correctAnswer){
                        //delete an answer
                        if(this.state.answers[i].answerText === ''){
                            this.props.deleteAnswer(answers[i]._id, question);
                        }
                        else{ //editing an answer
                            const editedAnswer = {
                                answerText: this.state.answers[i].answerText,
                                correctAnswer: this.state.answers[i].correctAnswer
                            }
                            this.props.editAnswer(editedAnswer, answers[i]._id, question);
                        }
                    }
                }
                else if(this.state.answers[i].answerText !== ''){
                    //creating a new answer
                    const newAnswer = {
                        answerText: this.state.answers[i].answerText,
                        correctAnswer: this.state.answers[i].correctAnswer
                    }
                    this.props.addAnswer(newAnswer, question._id);
                }
            }
        }
        this.handleClose();
    }
    render(){
        const {onClick, questions, answers, activeStep, quizId, handleExit} = this.props;
        return(
            <span>
            {activeStep !== questions.length ?                    
                <span>
                    <Button variant="contained" color="primary" onClick={onClick}>Next </Button>
                    <Button variant="contained" color="primary" onClick={() => {this.handleOpen(this.props.activeStep)}}>View Next Question</Button>
                    <Button variant="contained" color="primary" onClick={() => {this.handleOpen(-1)}}>Add Question </Button>
                    {this.state.loading === false &&
                        <QuestionModal
                            handleClose={this.handleClose}
                            open={this.state.open}
                            question={questions[this.state.index]}
                            answers={answers ? answers : this.state.answers}
                            handleChange={this.handleChange}
                            handleSave={this.handleSave}
                            handleChangeAnswer={this.handleChangeAnswer}
                            handleCheck={this.handleCheck}
                            handleDelete={this.handleDelete}
                            /> 
                    }
                </span>
            :   <span>
                    <Button variant="contained" color="primary" onClick={handleExit}>Exit </Button>
                </span>
            }
            </span>
        );
    }
}

ProctorView.propTypes = {
    questions: PropTypes.array,
    activeStep: PropTypes.number,
}

export default connect(
    state => ({

    }),
    {
        fetchAllAnswers,
        editQuestion,
        editAnswer,
        addQuestion,
        addAnswer,
        deleteAnswer,
        deleteQuestion,
    }
)(ProctorView);