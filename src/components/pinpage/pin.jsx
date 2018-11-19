import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PinPage from './pin-page'

class Pin extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        usersConnected: false,
    }

    componentDidUpdate(prevProps) {

    }

    render() {
        return <PinPage/>
    }
}

export default Pin;//connect()(Pin);