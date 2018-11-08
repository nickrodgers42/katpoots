import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchQuestions, editQuestion, addQuestion } from "../../actions/question";
import Button from '@material-ui/core/Button';
import QuestionModal from './QuestionModal'
import { fetchAllAnswers, editAnswer, addAnswer, deleteAnswer } from "../../actions/answer";

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
        loadingAnswers: true,
        newQuestion: false,
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
            fetchQuestions,
            match: {
                params: {quizId}
            }
        } = this.props;
        fetchQuestions(this.props.quizId || quizId);
    }


    componentDidUpdate(prevProps){
        if(this.props.questions !== prevProps.questions && this.state.newQuestion === true){
            this.setState({index: this.props.questions.length - 1});
            this.setState({newQuestion:false});
            this.props.fetchAllAnswers(this.props.questions[this.props.questions.length - 1]._id);
        }
        if(this.props.answers !== prevProps.answers && this.state.open === true){
            console.log(this.props.answers);
            for(let i = 0; i < this.props.answers.length; i++){
                this.state.answers[i].answerText = this.props.answers[i].answerText;
                this.state.answers[i].correctAnswer = this.props.answers[i].correctAnswer;
            }
            this.setState({loadingAnswers: false});
        }
    }

    handleOpen = (index) => {
        this.setState({open : true});
        if(index >= 0){
            this.props.fetchAllAnswers(this.props.questions[index]._id);
            this.setState({index: index});
        }
        else{
            this.setState({newQuestion: true})
            const newQuestion = {
                questionText: 'New Question'
            }
            this.props.addQuestion(newQuestion, this.props.match.params.quizId)
        }
    }

    handleClose = () => {
        this.setState({questionText: ''});
        for(let i = 0; i < this.state.answers.length; i++){
            this.state.answers[i].answerText = '';
            this.state.answers[i].correctAnswer = false;
        }
        this.setState({ open : false});
        this.setState({ loadingAnswers:true});
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

    handleChange = question => event => {
        this.setState({questionText: event.target.value});
    } 

    handleChangeAnswer = (index) => event => {
        this.state.answers[index].answerText = event.target.value;
    }

    handleCheck = (index) => event =>{
        this.state.answers[index].correctAnswer = event.target.checked;
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
                {this.state.loadingAnswers === false &&
                    <QuestionModal
                        handleClose={this.handleClose}
                        open={this.state.open}
                        question={questions[this.state.index]}
                        answers={answers ? answers : this.state.answers}
                        handleChange={this.handleChange}
                        handleSave={this.handleSave}
                        handleChangeAnswer={this.handleChangeAnswer}
                        handleCheck={this.handleCheck}
                    />
                }
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
        editQuestion,
        editAnswer,
        addQuestion,
        addAnswer,
        deleteAnswer
    }
)(CreateQuestions);