import React from "react";
import { withStyles, TextField, Grid } from "@material-ui/core";
import AppBarComponent from "../appbar/appbar-class";
import PinHolder from "./pinholder"
import UserList from "./userlist"

const styles = theme => ({
    
})

const PinPage = props => {
  const { classes } = props;
  return (
    <div id = "pinGridDiv">
        <div>
            <AppBarComponent history={ props.history }/>
        </div>
        <div>
            <PinHolder/>
        </div>
        <div>
            <UserList/>
        </div>
    </div>
  );
};

export default withStyles(styles)(PinPage);