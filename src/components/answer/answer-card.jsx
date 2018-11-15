import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const styles = {
  card: {
    width: 350
  },
  media: {
  },
  blueButton: {
    padding: '30px',
    fontSize: 24,
    backgroundColor: "2196f3"
  },
  redButton: {
    padding: '30px',
    fontSize: 24,
    backgroundColor: "#f44336"
  },
  orangeButton: {
    padding: '30px',
    fontSize: 24,
    backgroundColor: "#ff9800"
  },
  greenButton: {
    padding: '30px',
    fontSize: 24,
    backgroundColor: "#4caf50"
  },
  purpleButton: {
    padding: '30px',
    fontSize: 24,
    backgroundColor: "#9c27b0"
  },
  answerText: {
    fontsize: 18
  }
};

function AnswerCard(props) {
  const { classes, answer, vote, index, questionAnswered } = props;
  var buttonClass;
  var buttonClasses = [classes.blueButton, classes.redButton, classes.orangeButton, classes.greenButton, classes.purpleButton];
  buttonClass = buttonClasses[Math.floor(Math.random() * 5)];

  return (
    <Card className={classes.card} onClick={questionAnswered}>
      <CardActionArea className={classes.media} onClick={(event) => { vote(); questionAnswered(); }}>
        <CardContent>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={24}>
            <Grid item>
              <Button variant="contained" color="primary" className={buttonClass}>
                {String.fromCharCode('a'.charCodeAt(0) + index)}.
              </Button>
            </Grid>
            <Grid item wrap="nowrap" xs={8}>
              <Typography component="p" variant="h5">{answer.answerText}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

AnswerCard.propTypes = {
  classes: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired
};

export default withStyles(styles)(AnswerCard);
