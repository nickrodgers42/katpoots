import React from "react";
import { withStyles } from "@material-ui/core";
import ObjLink from "./objLink";
import PropTypes from "prop-types";
const styles = theme => ({});


const ObjList = props => {
  const { classes, items, editRedirect } = props;
  return (
    <div>
      {items.map(item => (
        <ObjLink key={item._id} title={item.title} onDelete={() => props.onDelete(item._id)} onEdit={() => props.onEdit(item._id)} editRedirect={() => props.editRedirect(item._id)} pinRedirect={() => props.pinRedirect(item._id)} />
      ))}
    </div>
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
