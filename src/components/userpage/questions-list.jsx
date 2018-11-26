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
import { Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CreateIcon from "@material-ui/icons/Create";
import { withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import yellow from "@material-ui/core/colors/yellow";

const styles = theme => ({
    green: {
        backgroundColor: green[500]
    },
    red: {
        backgroundColor: red[500]
    },
    yellow: {
        backgroundColor: yellow[900]
    },
    iconColor: {
        color: "#000"
    },
    questionText: {
        display: "inline-block",
        maxWidth: "300px"
    },
    button: {
        margin: "0 10px"
    }, 
    gridItem: {
        padding: "10px 0"
    },
    container: {
        minWidth: "400px"
    }
});


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
        const {questions, history, loadingQuestions, classes} = this.props;
        return (
            <div>
                <AppBarComponent history={history}/>
                <Grid container className={classes.container} justify="center" >
                    <Grid item>
                        <Card className={classes.container}>
                            <CardContent>
                                <Grid container direction="column" justify="space-between">
                                    <Grid item className={classes.gridItem}>
                                        <Typography
                                            variant="h4"
                                            className={classes.questionText}
                                        >
                                            Edit Quiz
                                        </Typography>
                                    </Grid>
                                    <Grid item className={classes.gridItem}>
                                        <Button onClick={this.handleNewQuestion} variant="contained"> Add Question </Button>
                                    </Grid>
                                        {this.state.loading === false &&
                                            <div>
                                            {questions.map((question, index) => (
                                            <Grid className={classes.gridItem} item xs={12}>
                                                <Card>
                                                    <CardContent>
                                                        <Grid container justify="space-between" alignItems="center" wrap="nowrap">
                                                            <Grid item className={classes.gridItem}>
                                                                <Typography variant="p" className={classes.questionText}>
                                                                    {question.questionText}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item className={classes.gridItem}>
                                                                <Button variant="contained" className={[classes.yellow,  classes.button]} onClick={()=>{this.handleOpen(index)}}>
                                                                    <CreateIcon className={classes.iconColor} />
                                                                </Button>
                                                                <Button variant="contained" className={classes.red} onClick={()=>{this.handleDelete(question)}}>
                                                                    <Delete className={classes.iconColor} />
                                                                </Button>    
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            ))}
                                            </div>
                                        }
                                        {this.state.loading === true &&
                                            <CircularProgress/>
                                        }

                                </Grid>
                                
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {this.state.open === true &&
                <AnswerModal
                    open={this.state.open}
                    question={questions[this.state.index]}
                    handleClose={this.handleClose}
                    handleDelete={this.handleDelete}
                />
                }
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
)(withStyles(styles)(QuestionsList));