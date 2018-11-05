import React from "react";
import { withStyles } from "@material-ui/core";
import ObjLink from "./objLink";
import PropTypes from "prop-types";
const styles = theme => ({});


const ObjList = props => {
  const { classes, items } = props;
  console.log(items);
  return (
    <div>
      {items.map(item => (
        <ObjLink key={item._id} title={item.title} onDelete={() => props.onDelete(item._id)} onEdit={() => props.onEdit(item._id)} />
      ))}
    </div>
  );
};

ObjList.propTypes = {
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default withStyles(styles)(ObjList);
