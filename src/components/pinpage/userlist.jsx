import React from 'react';
import {withStyles} from '@material-ui/core'

const styles = theme => ({

})

const UserList = props => {
    const {classes} = props;
    return (
        <div>
            <p>This will hold the list of users!</p>
        </div>
    )
}

export default withStyles(styles)(UserList)