import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/user";
import Appbar from "./appbar";

class AppBarComponent extends Component {
    constructor(props) {
        super(props);
        this.signUpRedirect = this.signUpRedirect.bind(this);
        this.homepageRedirect = this.homepageRedirect.bind(this);
        this.loginRedirect = this.loginRedirect.bind(this);
        this.logout = this.logout.bind(this);
        this.userPage = this.userPage.bind(this);
    }
    
    signUpRedirect() {
        this.props.history.push("/register");
    }

    loginRedirect() {
        this.props.history.push('/login');
    }

    logout() {
        this.props.dispatch(logoutUser());
    }
    
    homepageRedirect() {
        this.props.history.push('/');
    }

    userPage() {
        this.props.history.push('/user');
    }

    render() {
        const { user } = this.props;
        console.log(user);
        return (
            <div>
                <Appbar
                    logout = {this.logout} 
                    homepageRedirect = {this.homepageRedirect}
                    signUpRedirect = {this.signUpRedirect}
                    loginRedirect = {this.loginRedirect}
                    userPage = {this.userPage}
                    user={user}
                />
            </div>
        )
    }
}

AppBarComponent.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export default connect(state => {
    return { user: state.user };
})(AppBarComponent);