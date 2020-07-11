import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import PageSearch from "../PageSearch/PageSearch";
import PageStructure from "../PageStructure/PageStructure";
import PageUser from "../PageUser/PageUser";
import EditUser from "../PageEditContacts/PageEditContacts";
import PageUserForEdit from "../PageEditUser/PageEditUser";
import PageEditStructure from "../PageEditStructure/PageEditStructure";
import AdminRouter from "../AdminRouterContainer";
import "./PagesRouter.css";

class PagesRouter extends React.Component {

    render() {

        return (
            <div>
                <Switch>
                    <Route path="/search" component={PageSearch}/>
                    <Route path="/structure" component={PageStructure}/>
                    <Route path="/user/:id" component={PageUser}/>
                    <AdminRouter path="/edit" component={EditUser}/>
                    <AdminRouter path="/editUser/:id" component={PageUserForEdit}/>
                    <AdminRouter path="/editStructure" component={PageEditStructure}/>
                    <Route render={() => <Redirect to="/search"/>}/>
                </Switch>
                <ToastContainer
                    autoClose={2000}/>
            </div>
        );
    }
}

export default PagesRouter;