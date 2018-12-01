import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MediaQuery from 'react-responsive';

const styles = {
  cardDesktop: {
    width: 350
  },
  cardMobile: {
    width: 250
  },
  media: {
  },
  desktopButton: {
    padding: '30px',
    fontSize: 24
  },
  mobileButton: {
    padding: '5px 0'
  },
  blueButton: {
    backgroundColor: "2196f3"
  },
  redButton: {
    backgroundColor: "#f44336"
  },
  orangeButton: {
    backgroundColor: "#ff9800"
  },
  greenButton: {
    backgroundColor: "#4caf50"
  },
  purpleButton: {
    backgroundColor: "#9c27b0"
  },
  answerText: {
    fontsize: 18,
  }
};

function AnswerCard(props) {
  const { classes, answer, vote, index, questionAnswered } = props;
  var buttonClass;
  var buttonClasses = [classes.blueButton, classes.redButton, classes.orangeButton, classes.greenButton, classes.purpleButton];
  buttonClass = buttonClasses[index % 5];

  return (
    <div>
      {/* Desktop */}
      <MediaQuery minDeviceWidth={1224}>
        <Card className={classes.cardDesktop} onClick={questionAnswered}>
          <CardActionArea className={classes.media} onClick={(event) => { vote(); questionAnswered(); }}>
            <CardContent>
              <Grid container direction="row" justify="flex-start" alignItems="center" spacing={24}>
                <Grid item>
                  <Button variant="contained" color="primary" className={[buttonClass, classes.desktopButton]}>
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
      </MediaQuery>

      {/* Mobile */}
      <MediaQuery maxDeviceWidth={1224}>
        <Card className={classes.cardMobile} onClick={questionAnswered}>
          <CardActionArea className={classes.media} onClick={(event) => { vote(); questionAnswered(); }}>
            <CardContent>
              <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid Item>
                  <Button variant="contained" color="primary" className={[buttonClass, classes.mobileButton]}>
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
      </MediaQuery>
    </div>
  );
}

AnswerCard.propTypes = {
  classes: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired
};

export default withStyles(styles)(AnswerCard);
