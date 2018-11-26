import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PinPage from "./pin-page";
import Grid from '@material-ui/core/Grid'

class Pin extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    usersConnected: false
  };

  componentDidUpdate(prevProps) {}

  render() {
    return (
      <div>
        <PinPage history={this.props.history} />
      </div>
    );
  }
}

export default Pin; //connect()(Pin);
