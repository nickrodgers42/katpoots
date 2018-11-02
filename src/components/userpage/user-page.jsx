import React, {Component} from 'react'
import {connect} from "react-redux"
import ObjList from '../item-containers/objList'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    root: {
        flexgrow: 1
    },
    card: {
        backgroundColor: theme.backgroundColor,
        maxwidth: 300,
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        width: 400
    },
    button: {
        margin: 20
    }
})

class UserPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Grid>
                    <h2>Holds the logobar?</h2>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item>
                        <ObjList />
                    </Grid>
                    <Grid item>
                        Will Hold Something Else 1?
                    </Grid>
                    <Grid item>
                        Will Hold Something Else 1?
                    </Grid>
                </Grid>
                
            </div>
        )
    }
}

export default connect(state => {
    return{};
})(UserPage)