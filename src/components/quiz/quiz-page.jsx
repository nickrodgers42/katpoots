import React from "react";
import { withStyles } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Question from "../question/question";
import Button from "@material-ui/core/Button";
import StepLabel from "@material-ui/core/StepLabel";
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexgrow: 1
  },
  card: {
    backgroundColor: theme.backgroundColor
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: 400
  },
  button: {
    margin: 20
  }, 
  stepper: {
    maxWidth: 800,
    margin: "auto"
  },
  paper: {
    maxWidth: 1000,
    margin: "auto"
  }
});

const QuizPage = props => {
  const { classes, questions, voteCount, activeStep, onClick, vote } = props;
  return (
    <div>
      <Paper className={classes.paper} elevation={1}>
        <Stepper className={classes.stepper} activeStep={activeStep}>
        {questions.map(question => {
          return (
            <Step key={question._id}>
              <StepLabel />
            </Step>
          );
        })}
      </Stepper>
      <Grid container direction="row" justify="center" alignItems="center" spacing={24}>
          {activeStep !== questions.length ? (
            <Grid item>
              <Question question={questions[activeStep]} vote={vote} voteCount={voteCount} />
              <Button variant="contained" color="primary" onClick={onClick} className={classes.button}>
                {activeStep === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </Grid>
          ) : (
            <h2>Quiz over</h2>
          )}
      </Grid>
      </Paper>
    </div>
  );
};

QuizPage.propTypes = {
  activeStep: PropTypes.number,
  questions: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
  voteCount: PropTypes.number.isRequired
};

export default withStyles(styles)(QuizPage);
