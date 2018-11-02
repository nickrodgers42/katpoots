import React from "react";
import { withStyles } from "@material-ui/core";
import ObjLink from "./objLink"

const styles = theme => ({

})

const testData = {
    objname: "Obj Title"
};

const ObjList = props => {
    const {classes} = props;
    return (
        <div>
            <ObjLink objname = {testData.objname}/>
        </div>
    )
}

export default withStyles(styles)(ObjList)