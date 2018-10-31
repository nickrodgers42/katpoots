import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "./login-form";

class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.homepageRedirect = this.homepageRedirect.bind(this);
    };

    onSubmit(values) {
        this.props.dispatch();
    }

    handleRefreshClick(e) {
        e.preventDefault();
    }

    homepageRedirect() {
        this.props.history.push('/');
    }

    render() {
        return(
            <div>
                <LoginForm 
                    onSubmit={this.onSubmit}
                    homepageRedirect={this.homepageRedirect}
                />
            </div>
        )
    }
}

Login.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

export default connect(state => {
    return { user: state.user };
})(Login);