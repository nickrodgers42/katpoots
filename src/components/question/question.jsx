import React from "react";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Answer from "../answer/answer";

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
  }
});

const Question = props => {
  const { classes, question, vote, voteCount } = props;
  return (
    <div>
      <Grid container spacing={40}>
        <Grid item>
          <Paper>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {(question && question.questionText) || ""}
            </Typography>
          </Paper>
          <Paper>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {voteCount}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={40}>
        <Grid item>
          {question &&
            question.answers.map(answer => {
              return <Answer key={answer} answerId={answer} vote={vote} />;
            })}
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
