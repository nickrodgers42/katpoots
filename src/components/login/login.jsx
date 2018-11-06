import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "./login-form";
import { loginUser } from "../../actions/login";
import AppBarComponent from "../appbar/appbar-class";


class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.homepageRedirect = this.homepageRedirect.bind(this);
  }

  onSubmit(values) {
    this.props.dispatch(loginUser(values, this.props.history));
  }

  handleRefreshClick(e) {
    e.preventDefault();
  }

  homepageRedirect() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
      <AppBarComponent history={this.props.history} />
        <LoginForm 
          onSubmit={this.onSubmit} 
          history= {this.props.history}
          homepageRedirect={this.homepageRedirect} 
        />
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

export default connect(state => {
  console.log(state);
  return { user: state.user };
})(Login);
