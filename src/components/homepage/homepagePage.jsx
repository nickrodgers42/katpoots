import React, { Component } from "react";
import { connect } from "react-redux";
import Homepage from "./homepage";



class HomepagePage extends Component {
    constructor(props) {
        super(props);
        this.signUpRedirect = this.signUpRedirect.bind(this);
        this.loginRedirect = this.loginRedirect.bind(this);
    }

    signUpRedirect() {
        this.props.history.push('/register');
    }

    loginRedirect() {
        this.props.history.push('/login');
    }

    render() {
        return(
            <div>
                <Homepage 
                    signUpRedirect={ this.signUpRedirect } 
                    loginRedirect={ this.loginRedirect }
                />
            </div>
        )
    }

};

export default connect()(HomepagePage);