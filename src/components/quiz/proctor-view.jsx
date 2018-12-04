import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import AnswerModal from "../userpage/answer-modal";
import { addQuestion, deleteQuestion } from "../../actions/question";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LeaderboardModal from "./leaderboard-modal";
import AnswerCard from "../answer/answer-card";
import { withStyles } from "@material-ui/core/styles";
import catGif from "../../assets/cat.gif"


const styles = {
    answerGrid: {
        width: 800
    },
};

class ProctorView extends Component {
    constructor(props){
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleNewQuestion = this.handleNewQuestion.bind(this);
        this.exitProctor = this.exitProctor.bind(this);
        this.leaderboard = this.leaderboard.bind(this);
        this.leaderboardExit=this.leaderboardExit.bind(this);
    }

    state = {
        open: false,
        newQuestion: false,
        index: -1,
        leaderboardModalOpen: false
    }

    leaderboard = () => {
        this.setState({ leaderboardModalOpen: true});
      }
    
    leaderboardExit = () => {
        this.setState({ leaderboardModalOpen: false});
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
        const {onClick, handleExit, activeStep, questions, quizId, answers, classes, answerVoteCount} = this.props;
        var answerArray = [];
        var i = 0;
        if (answers) {
            answers.forEach(function(answer) {
                answerArray.push(
                <Grid item>
                    <AnswerCard answer={answer} vote={null} index = {i} questionAnswered={true} showAnswers={true} />
                    {answer._id in answerVoteCount ?
                        <div>{answerVoteCount[answer._id]}</div>
                    :   <div> 0</div>
                    }
                </Grid>
                );
                i += 1;
            });
        }
        return(
            <div>
                <div>
                    {this.state.leaderboardModalOpen === true &&
                        <LeaderboardModal
                            open={this.state.leaderboardModalOpen}
                            close={this.leaderboardExit}
                            quizId={quizId}
                        />
                    }
                </div>
                <Grid 
                    container
                    style={{height: "90vh"}}
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Card>
                            <CardContent>
                                <Typography variant="h4">
                                    {answers.length !== 0 ? "Correct Answers" : "Welcome!"}
                                </Typography>
                                    <Grid 
                                        item
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                        className={classes.answerGrid}
                                        spacing={24}
                                    >
                                        {(answers) ? answerArray : null}
                                    </Grid>
                            </CardContent>
                            {activeStep !== questions.length ?
                                <CardActions>
                                    <Button variant="contained" color="primary" onClick={this.exitProctor}>Next </Button>
                                    <Button variant="contained" color="primary" onClick={() => { this.handleOpen(activeStep) }}> View Next Question</Button>
                                    <Button variant="contained" color="primary" onClick={this.handleNewQuestion}>Add Question </Button>
                                    <Button variant="contained" color="primary" onClick={this.leaderboard}>Leaderboard </Button>
                                    <Button variant="contained" color="primary" onClick={handleExit}>Abandon Quiz </Button>
                                </CardActions>
                                : <CardActions>
                                    <Button variant="contained" color="primary" onClick={this.leaderboard}>Final Scores </Button>
                                    <Button variant="contained" color="primary" onClick={handleExit}>Abandon Quiz </Button>
                                </CardActions>
                            }
                        </Card>
                    </Grid>
                    {this.state.open === true &&
                        <AnswerModal
                            open={this.state.open}
                            question={questions[this.state.index]}
                            handleClose={this.handleClose}
                            handleDelete={this.handleDelete}
                        />
                    }
                </Grid>
            </div>
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
)(withStyles(styles)(ProctorView));