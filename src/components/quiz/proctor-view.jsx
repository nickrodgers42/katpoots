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
        const {handleExit, activeStep, questions } = this.props;
        return(
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
                                Leaderboard or Something
                            </Typography>
                        </CardContent>
                        {activeStep !== questions.length ?
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={this.exitProctor}>Next </Button>
                                <Button variant="contained" color="primary" onClick={() => { this.handleOpen(activeStep) }}> View Next Question</Button>
                                <Button variant="contained" color="primary" onClick={this.handleNewQuestion}>Add Question </Button>
                            </CardActions>
                            : <CardActions>
                                <Button variant="contained" color="primary" onClick={handleExit}>Exit </Button>
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