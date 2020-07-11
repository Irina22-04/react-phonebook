import React from "react";
import { connect } from "react-redux";
import {Redirect, Route} from "react-router-dom";

class AdminRoute extends React.PureComponent {

    render() {

        const {userForAuthorisation: { isAdmin }, ...other } = this.props;
        return isAdmin ? <Route {...other} /> : <Redirect to="/search"/>;
    }
}

function mapStateToProps(state) {
    return {
        userForAuthorisation: state.userForAuthorisation,
    };
}

export default connect(mapStateToProps)(AdminRoute);