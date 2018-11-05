import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

function AnswerCard(props) {
  const { classes, answer, vote } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.media} onClick={vote}>
        <CardContent>
          <Typography component="p">{answer.answerText}</Typography>
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
