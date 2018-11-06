import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/register";
import RegisterForm from "./register-form";
import AppBarComponent from "../appbar/appbar-class";


class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.homepageRedirect = this.homepageRedirect.bind(this);
  }

  onSubmit(values) {
    this.props.dispatch(registerUser(values, this.props.history));
  }

  handleRefreshClick(e) {
    e.preventDefault();
  }

  homepageRedirect() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <AppBarComponent history={this.props.history} />
        <RegisterForm 
          onSubmit={this.onSubmit}
          homepageRedirect={this.homepageRedirect}
        />
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
