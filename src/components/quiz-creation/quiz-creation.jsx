import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import TextField from "../text-field/text-field";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add"
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { CardContent, CardActions } from "@material-ui/core/";
import Grid from "@material-ui/core/Grid";
import ObjList from "../item-containers/objList"
import "typeface-roboto";

const styles = theme => ({
  button: {
    alignItems: "center"
  }
});

const validate = values => {
  const errors = {};
  Object.keys(values).forEach(key => {
    if (!values[key]) {
      errors[key] = "Required";
    }
  });
  return errors;
};

const QuizCreation = props => {
  const { classes } = props;
  return (
    <Grid container className={classes.root} spacing={16}>
      <Grid item xs={12}>
        <Grid container className={classes.grid} justify="center" alignItems="center" spacing={8}>
          <Form
            className={classes.container}
            initialValues={{}}
            render={({ handleSubmit, reset, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h3" color="inherit">
                      Create a Quiz
                    </Typography>
                    <div>
                      Insert Quiz Title:
                    </div>
                  </CardContent>
                  <Button className={classes.button}>
                        Add a Question?
                    </Button>
                    <p>Will hold all quizzes maybe? Still working on crap</p>
                  <CardActions>
                    <Grid container justify="space-between">
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="button"
                        onClick={reset}
                        disabled={submitting || pristine}
                        size="large"
                      >
                        Reset
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting || pristine}
                        size="large"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </CardActions>
                </Card>
              </form>
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

QuizCreation.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(QuizCreation);
