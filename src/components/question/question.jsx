import React from "react";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Answer from "../answer/answer";
import AnswerCard from "../answer/answer-card";

const styles = theme => ({
  root: {
    flexgrow: 1
  },
  card: {
    backgroundColor: theme.backgroundColor,
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
  answerGrid: {
    width: 800
  }
});

const Question = props => {
  const { classes, question, vote, voteCount, answers } = props;
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        className={classes.answerGrid}
        spacing={24}
      >
          <Grid item xs={3}>
            <Paper elevation={1}>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Votes: {voteCount}
              </Typography>
            </Paper>
          </Grid>
      </Grid>
      
      <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.answerGrid}
        spacing={24}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="inherit" className={classes.grow}>
            {(question && question.questionText) || ""}
          </Typography>
        </Grid>
      <Grid 
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.answerGrid}
        spacing={24}
      >
        {answers ? answers.map(answer => {
          return(
            <Grid item>
              <AnswerCard answer={answer} vote={vote} />
            </Grid>
          );
        }): null};
      </Grid>
      </Grid>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object,
  vote: PropTypes.func.isRequired,
  voteCount: PropTypes.number.isRequired
};

export default withStyles(styles)(Question);
