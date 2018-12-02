import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { fetchStudents } from "../../actions/student";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    background: "000"
  },
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
            <div className={classes.paper}>
              {/* Only display top 5 users */}
              {users.map((user, index) => index <= 4 ? (
                
                <h3> {user.displayName} Score: {user.score} </h3>
              ):null)}
            </div>
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