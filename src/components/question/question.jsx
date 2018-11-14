import React from "react";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Answer from "../answer/answer";
import AnswerCard from "../answer/answer-card";
import CircularProgress from '@material-ui/core/CircularProgress';


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
  },
  spinner: {
    margin: "100px 0"
  }
});

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Question = props => {
  const { classes, question, vote, voteCount, answers, answered, questionAnswered } = props;
  var answerArray = [];
  var i = 0;
  shuffle(answers).forEach(function(answer) {
    answerArray.push(
      <Grid item>
        <AnswerCard answer={answer} vote={vote} index = {i} questionAnswered={questionAnswered} />
      </Grid>
    );
    i += 1;
  });
  
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
        {(answers && !answered) ? answerArray : <CircularProgress className={classes.spinner}/>};

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
