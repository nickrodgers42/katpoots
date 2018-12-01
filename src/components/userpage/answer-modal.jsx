import React, { Component } from "react";
import { connect } from "react-redux";
import Delete from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles, Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchAllAnswers, addAnswer, deleteAnswer, editAnswer } from "../../actions/answer";
import { editQuestion } from "../../actions/question";
import DeleteIcon from '@material-ui/icons/Delete';



const styles = theme => ({
    paper: {
      position: "absolute",
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      background: "000"
    },
  
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    },
  
    save: {
      backgroundColor: "#99fd00"
    },
  
    cancel: {
      backgroundColor: "#FFEB3B"
    },
  
    delete: {
      backgroundColor: "#E53935"
    },
  
    button: {
      marginRight: 10,
      marginTop: 10
    },
    card: {
        maxWidth: "400px",
        margin: "auto",
    },
    grid: {
        height: "100vh"
    },
    gridItem:{
        padding: "10px 0"
    }
  });

class AnswerModal extends Component {
    constructor(props){
        super(props);
        this.addAnswer = this.addAnswer.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
        this.clearData = this.clearData.bind(this);
        this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    state = {
        answers: [],
        loadedStoredAnswers: false,
        deletedAnswer: false,
        questionText: ''
    }

    componentDidMount(){
        this.props.fetchAllAnswers(this.props.question._id);
    }



    componentDidUpdate(){
        if(this.props.loadingAnswers === false && this.state.loadedStoredAnswers === false){
            this.setState({questionText: this.props.question.questionText});
            for(let i of this.props.answers){
                let storedAnswer = {
                    answerText: i.answerText,
                    correctAnswer: i.correctAnswer,
                    id: i._id
                }
                this.state.answers.push(storedAnswer);
            }
            this.setState({loadedStoredAnswers: true});
        }
        if(this.state.deletedAnswer === true && this.props.loadingAnswers === false){
            this.setState({deletedAnswer:false});
        }
    }

    addAnswer(){
        const newAnswer = {
            answerText: 'New Answer',
            correctAnswer: false
        }
        this.state.answers.push(newAnswer);
        this.setState({answers: this.state.answers});
    }

    deleteAnswer(answer, index){
        if(answer.id){
            this.props.deleteAnswer(answer.id, this.props.question);
        }
        this.state.answers.splice(index, 1);
        this.setState({answers: this.state.answers});
        this.setState({deletedAnswer:true});
    }

    handleChangeQuestion = () => event => {
        this.setState({questionText: event.target.value});
    }

    handleChangeAnswer = index => event => {
        let newAnswers = [...this.state.answers];
        newAnswers[index].answerText = event.target.value;
        this.setState({answers: newAnswers});
    }

    handleCheck = index => event =>{
        let newAnswers = [...this.state.answers];
        newAnswers[index].correctAnswer = event.target.checked;
        this.setState({answers: newAnswers});
    }

    handleSave(){
        const {question, answers} = this.props;
        if(this.state.questionText !== question.questionText){
            const editedQuestion = {
                questionText: this.state.questionText
            }
            this.props.editQuestion(editedQuestion, question._id, question.parent)
        }
        for(let i = 0; i < this.state.answers.length; i++){
            const newAnswer = {
                answerText: this.state.answers[i].answerText,
                correctAnswer: this.state.answers[i].correctAnswer
            }
            if (answers[i]){
                if(this.state.answers[i].answerText !== answers[i].answerText || this.state.answers[i].correctAnswer !== answers[i].correctAnswer){
                    this.props.editAnswer(newAnswer, answers[i]._id);
                }
            }
            else{
                this.props.addAnswer(newAnswer, question._id);
            }
        }
        this.clearData();
    }

    clearData(deleteQuestion){
        let answers = [];
        this.setState({answers:answers});
        this.setState({loadedStoredAnswers:false});
        if(deleteQuestion){
            this.props.handleDelete(this.props.question);
        }
        this.props.handleClose();
    }

    render(){
        const {open, classes} = this.props;
        return (
            <div>
                {this.state.loadedStoredAnswers === true &&
                <Dialog open={open}>
                    <DialogTitle>
                        Edit Questions
                    </DialogTitle>
                    <DialogContent>
                        <Grid container direction="column" justify="flex-start" alignItems="stretch">
                            <Grid item className={classes.gridItem}>
                                <TextField
                                    label="Question Text"
                                    placeholder={this.state.questionText === "New Question" ? this.state.questionText : null}
                                    defaultValue={this.state.questionText === "New Question" ? null : this.state.questionText}
                                    onChange={this.handleChangeQuestion()}
                                />
                            </Grid>
                            <Grid item className={classes.gridItem}>
                                <Button
                                    onClick={this.addAnswer}
                                    variant="contained"
                                >
                                    Add Answer
                                </Button>
                            </Grid>
                                {this.state.answers && this.state.deletedAnswer === false ? this.state.answers.map((answer, index) => (
                                    <Grid item className={classes.gridItem}>
                                        <TextField
                                            required
                                            label={"Answer " + (index + 1)}
                                            placeholder={answer.answerText === "New Answer" ? answer.answerText : null}
                                            defaultValue={answer.answerText === "New Answer" ? null : answer.answerText}
                                            onChange={this.handleChangeAnswer(index)}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked={answer.correctAnswer}
                                                    onChange={this.handleCheck(index)}
                                                />
                                            }
                                            label="Correct?"
                                        />
                                        <Button variant="contained" className={classes.delete} onClick={() => { this.deleteAnswer(answer, index) }}> <Delete /></Button>
                                    </Grid>
                                )) : null}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button className={[classes.save, classes.button]} onClick={this.handleSave}> Save </Button>
                        <Button className={[classes.delete, classes.button]} onClick={() => { this.clearData(true) }}>
                            Delete &nbsp; 
                            <DeleteIcon className={classes.icon} />
                        </Button>
                        <Button className={[classes.cancel, classes.button]} onClick={() => { this.clearData(false) }}> Cancel Edit </Button>
                    </DialogActions>
                </Dialog>
                }
                {this.state.loadedStoredAnswers === false && open===true &&
                    <CircularProgress/>
                }
            </div>
        )
    }
}

AnswerModal.propTypes = {
    question: PropTypes.object,
    open: PropTypes.bool,
    answers: PropTypes.object,
}

export default connect(
    state => ({
        answers: state.answer.answers,
        loadingAnswers: state.answer.loadingAnswers,
    }),
    {
        fetchAllAnswers,
        addAnswer,
        deleteAnswer,
        editAnswer,
        editQuestion
    }
)(withStyles(styles)(AnswerModal))