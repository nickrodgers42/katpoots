import React from "react";
import { withStyles } from "@material-ui/core";
import ObjList from "../item-containers/objList";
import CreateQuiz from "../userpage/create-quiz";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import AppBarComponent from "../appbar/appbar-class"

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
  const { classes, quizzes, deleteQuiz, editQuiz, history, handleNewQuiz, handleChangeQuiz} = props;
  return (
    <div>
      <Grid>
        <AppBarComponent history={history}/>
      </Grid>
      <Grid container spacing={24}>
      <Grid item>
        <CreateQuiz handleNewQuiz={handleNewQuiz} handleChangeQuiz={handleChangeQuiz} />
        </Grid>
        <Grid item>
          <ObjList items={quizzes} onDelete={deleteQuiz} onEdit={editQuiz} />
        </Grid>
      </Grid>
    </div>
  );
};

UserPage.propTypes = {
  quizzes: PropTypes.array.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(UserPage);
