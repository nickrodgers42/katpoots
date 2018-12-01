import React from 'react';
import {withStyles} from '@material-ui/core'

const styles = theme => ({

})

const UserList = props => {
    const { students} = props;
    console.log(students);
    return (
        <div>
            {students.map(student =>{
                return(
                <p>{student.displayName}</p>
                )
            })}
        </div>
    )
}

export default withStyles(styles)(UserList)