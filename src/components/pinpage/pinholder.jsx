import React from 'react';
import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types'

const styles = theme => ({

})

const PinHolder = props => {
    return (
        <div>
            <p>This Will Hold the Pin!</p>
        </div>
    )
}

export default withStyles(styles)(PinHolder);