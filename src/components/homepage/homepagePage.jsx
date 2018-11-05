import React, { Component } from "react";
import { connect } from "react-redux";
import Homepage from "./homepage";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/user";

class HomepagePage extends Component {
  constructor(props) {
    super(props);
    this.signUpRedirect = this.signUpRedirect.bind(this);
    this.loginRedirect = this.loginRedirect.bind(this);
    this.logout = this.logout.bind(this);
  }

  signUpRedirect() {
    this.props.history.push("/register");
  }

  loginRedirect() {
    this.props.history.push("/login");
  }

  logout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Homepage
          logout={this.logout}
          signUpRedirect={this.signUpRedirect}
          loginRedirect={this.loginRedirect}
          history= {this.props.history}
          user={user}
        />
      </div>
    );
  }
}

HomepagePage.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

export default connect(state => {
  return { user: state.user };
})(HomepagePage);
