import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchQuestions, editQuestion, addQuestion } from "../../actions/question";
import Button from '@material-ui/core/Button';
import QuestionModal from './QuestionModal'
import { fetchAllAnswers, editAnswer, addAnswer } from "../../actions/answer";
import PropTypes from "prop-types";
import { configOptions } from "final-form";

class CreateQuestions extends Component {
    constructor(props){
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
    }

    state = {
        open: false,
        index: -1,
        questionText: '',
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
        ]
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


    componentDidUpdate(prevProps){
        if(this.props.questions.length !== prevProps.questions.length){
            let parentQuestion = this.props.questions[this.props.questions.length-1];
            for (let i = 0; i < this.state.answers.length; i++){
                let answerText = this.state.answers[i].answerText;
                let correctAnswer = this.state.answers[i].correctAnswer;
                this.state.answers[i].answerText = '';
                this.state.answers[i].correctAnswer = false;
                if (answerText !== ''){
                    const newAnswer = {
                        answerText,
                        correctAnswer,
                    }
                    this.props.addAnswer(newAnswer, parentQuestion._id, parentQuestion.parent);
                }
            }
        }
    }

    handleOpen = (index) => {
        this.setState({open : true});
        this.setState({index: index});
    }

    handleClose = () => {
        this.setState({questionText: ''});
        for(let i = 0; i < this.state.answers.length; i++){
            this.state.answers[i].answerText = '';
            this.state.answers[i].correctAnswer = false;
        }
        this.setState({ open : false});
    }

    handleSave = (question, answers) =>{
        this.setState({ open: false});

        //case where question already exists, we are updating
        if (question){
            let questionText = question.questionText;
            const editedQuestion = {
                questionText:questionText
            }
            this.props.editQuestion(editedQuestion, question._id, question.parent);

            //case where existing question gets an added answer
            for (let i = 0; i < this.state.answers.length; i++){
                let answerText = this.state.answers[i].answerText;
                let correctAnswer = this.state.answers[i].correctAnswer;
                this.state.answers[i].answerText = '';
                this.state.answers[i].correctAnswer = false;
                if (answerText !== ''){
                    const newAnswer = {
                        answerText,
                        correctAnswer,
                    }
                    this.props.addAnswer(newAnswer, question._id, question.parent);
                }
            } 
        }

        //case where answer already exists
        if (answers){
            for(let answer of answers){
                let answerText = answer.answerText;
                let correctAnswer = answer.correctAnswer;
                const editedAnswer = {
                    answerText,
                    correctAnswer
                }
                this.props.editAnswer(editedAnswer, answer._id, answer.quizParent)
            }
        }

        //case where there is a new question created, new answers are created in componentDidUpdate()
        if(this.state.questionText !== ''){
            console.log('creating a question');
            const newQuiz = {
                questionText: this.state.questionText
            }
            this.props.addQuestion(newQuiz, this.props.match.params.quizId)
        }
    }

    handleChange = question => event => {
        if(question){
            question.questionText = event.target.value;
        }
        else{
            this.setState({questionText: event.target.value});
        }
    } 

    handleChangeAnswer = (answer, index) => event => {
        if(answer){
            answer.answerText = event.target.value;
        }
        else{
            this.state.answers[index].answerText = event.target.value;
        }
    }

    handleCheck = (answer, index) => event =>{
        if(answer){
            answer.correctAnswer = event.target.checked;
        }
        else{
            this.state.answers[index].correctAnswer = event.target.checked;
        }
    }
    
    render(){
        const {questions, answers} = this.props;
        return( 
            <div>
                <Button
                onClick={() =>{this.handleOpen(-1)}}>
                Add Question
                </Button>
                {questions ? questions.map((question, index) => (
                    <div onClick={()=>{this.handleOpen(index)}}> {question.questionText} </div>
                )):null}
                <QuestionModal
                    handleClose={this.handleClose}
                    open={this.state.open}
                    question={questions[this.state.index]}
                    answers={questions[this.state.index] ? answers.filter(answer => answer.parent === questions[this.state.index]._id): []}
                    handleChange={this.handleChange}
                    handleSave={this.handleSave}
                    handleChangeAnswer={this.handleChangeAnswer}
                    handleCheck={this.handleCheck}
                />
            </div>
        );
    }
}

CreateQuestions.propTypes = {
    dispatch: PropTypes.func.isRequired,
}

export default connect(
    state => ({
        questions: state.question.questions,
        answers: state.answer.answers
    }),
    {
        fetchQuestions,
        fetchAllAnswers,
        editQuestion,
        editAnswer,
        addQuestion,
        addAnswer
    }
)(CreateQuestions);