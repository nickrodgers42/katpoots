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
    componentDidMount(){
        this.props.fetchStudents(this.props.quizId);
    }

    render() {
        const { open, classes, close, quizId } = this.props;

    return (
      <div>
        <Modal
          open={open}
          onClose={close}
        >
          <div className={classes.paper}>
          </div>
        </Modal>
      </div>
    );
  }
}

LeaderboardModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
export default connect(
    state => ({}),
    {
        fetchStudents
    }
)(withStyles(styles)(LeaderboardModal));