import React from "react";
import { withStyles } from "@material-ui/core";
import ObjList from "../item-containers/objList";
import CreateQuiz from "../userpage/create-quiz";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    flexgrow: 1
  },
  card: {
    backgroundColor: theme.backgroundColor,
    maxwidth: 300
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

const UserPage = props => {
  const { classes, quizzes, deleteQuiz } = props;
  return (
    <div>
      <Grid>
        <h2>Holds the logobar?</h2>
      </Grid>
      <Grid container spacing={24}>
        <Grid item>
          <ObjList items={quizzes} onDelete={deleteQuiz} />
        </Grid>
        <Grid item>Will Hold Something Else 1?</Grid>
        <Grid item>
            <CreateQuiz />
            
        </Grid>
      </Grid>
    </div>
  );
};

UserPage.propTypes = {
  quizzes: PropTypes.array.isRequired,
  deleteQuiz: PropTypes.func.isRequired
};

export default withStyles(styles)(UserPage);
