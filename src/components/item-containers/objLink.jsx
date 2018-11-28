import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import PlayArrow from "@material-ui/icons/PlayArrow";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import yellow from "@material-ui/core/colors/yellow";
import PropTypes from "prop-types";

const styles = theme => ({
  button: {
    margin: 5,
  },
  green: {
    backgroundColor: green[500]
  },
  red: {
    backgroundColor: red[500]
  },
  yellow: {
    backgroundColor: yellow[900]
  },
  iconColor: {
    color: "#fff"
  },
  objTitle: {
    fontSize: 40,
    marginRight: "10px",
    color: '#fff'
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "10px",
    padding: "10px"
  },
  backColor: {
    backgroundColor: "#3f51b5",
    display: "inline-block",
    borderRadius: 25,
    margin: "10px"
  }
});

const ObjLink = props => {
  const { classes } = props;
  return (
    <form className={classes.backColor} backgroundColor="primary">
      <div className={classes.flex}>
        <a onClick={props.onEdit}><label className={classes.objTitle}>{props.title}: </label></a>
        <Button className={`${classes.button} ${classes.yellow}`} 
          variant="fab" 
          color="primary" 
          aria-label="Edit"
          onClick={props.editRedirect}
          >
          <CreateIcon className={classes.iconColor} />
        </Button>
        <Button
          className={`${classes.button} ${classes.red}`}
          variant="fab"
          color="secondary"
          aria-label="Delete"
          onClick={props.onDelete}
        >
          <DeleteIcon className={classes.iconColor} />
        </Button>
        <Button className={`${classes.button} ${classes.green}`} 
          variant="fab" 
          aria-label="Play"
          onClick={props.pinRedirect}>
          <PlayArrow className={classes.iconColor} />
        </Button>
      </div>
    </form>
  );
};

ObjLink.propTypes = {
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  editRedirect: PropTypes.func.isRequired,
  pinRedirect: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(ObjLink);
