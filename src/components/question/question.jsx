import React from "react";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AnswerCard from "../answer/answer-card";
import catGif from "../../assets/cat.gif"
import MediaQuery from 'react-responsive';


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
  loadingGif: {
    height: "120px"
  },
  button: {
    margin: 20
  },
  answerGrid: {
    width: 800
  },
  spinner: {
    margin: "100px 0"
  },
  score: {
    padding: "5px"
  },
  votes: {
    padding: "5px"
  },
  time: {
    padding: "10px"
  },
  red: {
    backgroundColor: "#f6685e"
  },
  yellow: {
    backgroundColor: "#ffeb3b"
  }
}); 

const Question = props => {
  const { classes, question, vote, voteCount, answers, answered, questionAnswered, owner, user, timer } = props;
  var currentTime = parseInt(timer, 10);
  var answerArray = [];
  var i = 0;
  answers.forEach(function(answer) {
    answerArray.push(
      <Grid item>
        <AnswerCard answer={answer} vote={vote} index = {i} questionAnswered={questionAnswered} showAnswers={false} votesReceived={0} />
      </Grid>
    );
    i += 1;
  });
  var timerBackground = null;
  if (currentTime <= 5) {
    timerBackground = classes.red;
  }
  else if (currentTime <= 10) {
    timerBackground = classes.yellow;
  }
  return (
    <div>
      {/* Desktop */}
      <MediaQuery minDeviceWidth={1224}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          className={classes.answerGrid}
          spacing={24}
        >
          {owner === true ?
            <Grid item 
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
            <Grid item>
                  {timer ?
                    <Paper elevation={1} className={timerBackground}>
                      <Typography variant="h4" className={classes.time}> {currentTime} </Typography>
                    </Paper>
                  :
                    null
                  }
            </Grid>
            <Grid item xs={3}>
              <Paper elevation={1}>
                <Typography variant="h6" color="inherit" className={[classes.grow, classes.votes]}>
                  Votes: {voteCount}
                </Typography>
              </Paper>
            </Grid>
            </Grid>
          :
            <Grid item xs={3}>
              <Paper elevation={1}>
                {owner !== true && !answered &&
                  <Typography variant="h6" color="inherit" className={[classes.grow, classes.score]}>
                    Score: {user.score}
                  </Typography>
                }
              </Paper>
            </Grid>
          }
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
            {(answers && !answered) ? answerArray : <img className={classes.loadingGif} src={catGif} />}

        </Grid>
        </Grid>
      </MediaQuery>
      {/* Mobile */}
      <MediaQuery maxDeviceWidth={1224}>
        <Grid container direction="column" justify="center" alignItems="flex-start" spacing={24}>
          <Grid item>
            <Typography variant="h5" color="inherit" >
              {(question && question.questionText) || ""}
            </Typography>
          </Grid>
          {/* Uncomment this for the vote on mobile */}
          {/* <Grid item>
            <Paper elevation={1}>
              <Typography variant="p" color="inherit" className={classes.grow}>
                Votes: {voteCount}
              </Typography>
            </Paper>
          </Grid> */}
              <Paper elevation={1}>
                {owner !== true && !answered &&
                  <Typography variant="h6" color="inherit" className={[classes.grow, classes.score]}>
                    Score: {user.score}
                  </Typography>
                }
              </Paper>
          <Grid
            item
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={24}
          >
            {(answers && !answered) ? answerArray : <img className={classes.loadingGif} src={catGif} />}

          </Grid>
        </Grid>
      </MediaQuery>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object,
  vote: PropTypes.func.isRequired,
  voteCount: PropTypes.number.isRequired
};

export default withStyles(styles)(Question);
