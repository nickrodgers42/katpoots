import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/register";
import RegisterForm from "./register-form";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    this.props.dispatch(registerUser(values, this.props.history));
  }

  handleRefreshClick(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <RegisterForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

Register.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

export default connect(state => {
  return { user: state.user };
})(Register);
