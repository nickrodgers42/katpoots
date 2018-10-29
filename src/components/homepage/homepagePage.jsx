import React, { Component } from "react";
import { connect } from "react-redux";
import Homepage from "./homepage";



class HomepagePage extends Component {
    constructor(props) {
        super(props);
        this.signUpRedirect = this.signUpRedirect.bind(this);
    }

    signUpRedirect() {
        this.props.history.push('/register');
    }

    render() {
        return(
            <div>
                <Homepage signUpRedirect={ this.signUpRedirect } />
            </div>
        )
    }

};

export default connect()(HomepagePage);