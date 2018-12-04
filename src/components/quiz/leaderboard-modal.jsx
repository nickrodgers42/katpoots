import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { fetchStudents } from "../../actions/student";
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";



const styles = theme => ({
  paper: {
    minHeight: "100px",
    minWidth: "500px"
  },
  container: {
    height: "100vh"
  },
  names: {
    padding: "10px 20px"
  },
  title: {
    padding: "30px 0 10px 20px"
  },
  itemSpace: {
    width: "400px",
  },
  leaderboardName: {
    wordWrap: "break-word"
  }
});

class LeaderboardModal extends React.Component {

    state = {
      loadingStudents: true
    }

    componentDidMount(){
        this.props.fetchStudents(this.props.quizId);
    }

    componentDidUpdate(prevProps){
      if(prevProps.users !== this.props.users){
        this.setState({ loadingStudents: false });
      }
    }

    render() {
        const { open, classes, close, users } = this.props;

    return (
      <div>
              {this.state.loadingStudents === false &&
                <Modal
                  open={open}
                  onClose={close}
                >
                <Grid container onClick={close} className={classes.container} justify="center" alignItems="center" spacing={24}>
                  <Grid item>
                  <Paper >
                    <Grid className={classes.paper} container direction="column" justify="center" alignItems="flex-start">
                      {/* Only display top 5 users */}
                      <Grid item>
                        <Typography variant="h4" className={classes.title}>
                          Leaderboard
                        </Typography>
                        </Grid>
                        <Grid item className={classes.names}>
                          <Grid container justify="space-between" alignItems="center"className={classes.itemSpace}>
                            <Grid item>
                              <Typography variant="h6"> Name </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="h6">Score </Typography> 
                            </Grid>
                          </Grid>
                        </Grid>
                      {users.map((user, index) => index <= 4 ? (
                        <Grid item className={classes.names}>
                          <Grid container justify="space-between" alignItems="center"className={classes.itemSpace}>
                            <Grid item xs={9} >
                              <Typography variant="h6"className={classes.leaderboardName}> {index + 1})&nbsp;{user.displayName} </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography variant="h6" align='right'>{user.score} </Typography> 
                            </Grid>
                          </Grid>
                        </Grid>
                      ):null)}
                      
                    </Grid>
                  </Paper>
                  </Grid>
                </Grid>
                </Modal>
              }
      </div>
    );
  }
}

LeaderboardModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
export default connect(
    state => ({
      users: state.quiz.users
    }),
    {
        fetchStudents
    }
)(withStyles(styles)(LeaderboardModal));