import React from "react";
import { withStyles } from "@material-ui/core";
import ObjLink from "./objLink";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({});


const ObjList = props => {
  const { items } = props;
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      {items.map(item => (
        <Grid item>
        <ObjLink
          key={item._id}
          title={item.title}
          onDelete={() => props.onDelete(item._id)}
          onEdit={() => props.onEdit(item._id)}
          editRedirect={() => props.editRedirect(item._id)}
          pinRedirect={() => props.pinRedirect(item._id)}
        />
        </Grid>
      ))}
    </Grid>
  );
};

ObjList.propTypes = {
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  editRedirect: PropTypes.func.isRequired,
  pinRedirect: PropTypes.func.isRequired,
};

export default withStyles(styles)(ObjList);
