import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchQuestions, addQuestion, deleteQuestion } from "../../actions/question"
import AppBarComponent from "../appbar/appbar-class"
import Delete from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AnswerModal from "./answer-modal";

class QuestionsList extends Component {
    constructor(props){
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleNewQuestion = this.handleNewQuestion.bind(this);
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

    state = {
        open: false,
        index: -1,
        loading: true,
        newQuestion: false,
    }

    componentDidUpdate(prevProps){
        if(this.props.loadingQuestions === false && prevProps.loadingQuestions === true){
            this.setState({loading:false});
        }
        if(this.state.newQuestion === true && this.props.questions !== prevProps.questions){
            this.setState({newQuestion: false});
            this.handleOpen(this.props.questions.length -1);
        }
    }

    handleOpen(index){
        this.setState({open:true});
        this.setState({index:index});
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
        this.props.addQuestion(newQuestion, this.props.match.params.quizId);
        this.setState({newQuestion:true});
        this.setState({loading:true});
    }

    render(){
        const {questions, history, loadingQuestions} = this.props;
        return (
            <div>
                <div>
                    <Grid>
                        <AppBarComponent history={history}/>
                    </Grid>
                    <Button onClick={this.handleNewQuestion}> Add Question </Button>
                    {this.state.loading === false &&
                        <div>
                        {questions.map((question, index) => (
                            <div>
                                <Button onClick={()=>{this.handleOpen(index)}}>{question.questionText} </Button>
                                <Button onClick={()=>{this.handleDelete(question)}}> <Delete /></Button>
                            </div>
                        ))}
                        </div>
                    }
                    {this.state.loading === true &&
                        <CircularProgress/>
                    }
                    {this.state.open === true &&
                    <AnswerModal
                        open={this.state.open}
                        question={questions[this.state.index]}
                        handleClose={this.handleClose}
                        handleDelete={this.handleDelete}
                    />
                    }
                </div>
            </div>
        )
    }
}

QuestionsList.propTypes = {
    history: PropTypes.object.isRequired,
    questions: PropTypes.object,
}

export default connect(
    state => ({
        questions: state.question.questions,
        loadingQuestions: state.question.loadingQuestions
    }),
    {
        fetchQuestions,
        addQuestion,
        deleteQuestion
    }
)(QuestionsList);