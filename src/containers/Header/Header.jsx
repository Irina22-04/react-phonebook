import React from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Menu} from "semantic-ui-react";

import {leaveAccount, setUserAuthorisation} from "../../store/actions/authorisationUserActions";
import AuthorisationForm from "../../components/AuthorisationForm/AuthorisationForm";
import "./Header.css";

class Header extends React.Component {

    static propTypes = {
        userForAuthorisation: PropTypes.object.isRequired,
    };

    getButtons = () => {
        const buttons = [
            {
                name: 'Войти',
                action: () => {
                    this.props.dispatch(setUserAuthorisation(this.props.dispatch, true));
                },
                show: !this.props.userForAuthorisation.isAuthorisation && !this.props.userForAuthorisation.userId,
            },
            {
                name: 'Выйти',
                action: () => {
                    this.props.dispatch(leaveAccount(this.props.dispatch));
                },
                show: this.props.userForAuthorisation.userId,
            }
        ].filter(button => button.show);

        return buttons.map(button => (
            <Button className={'enter-button'} basic color={'teal'} onClick={button.action}
                    key={button.name}>{button.name}</Button>
        ))
    };

    getAuthorisationForm = () => {
        return this.props.userForAuthorisation.isAuthorisation ? <AuthorisationForm/> : null;
    };

    getLinks = () => {
        return this.props.userForAuthorisation.isAdmin ? (
            <React.Fragment>
                <NavLink to={'/edit'} activeClassName="ActivePageLink">
                    <Menu.Item name={'РЕДАКТИРОВАНИЕ ПОЛЬЗОВАТЕЛЕЙ'}/>
                </NavLink>

                <NavLink to={'/editStructure'} activeClassName="ActivePageLink">
                    <Menu.Item name={'РЕДАКТИРОВАНИЕ СТРУКТУРЫ'}/>
                </NavLink>
            </React.Fragment>) : null;
    };

    render() {

        return (
            <div className={'menu-container'}>
                <Menu secondary className={'main-menu'}>
                    <NavLink to={'/search'} activeClassName="ActivePageLink">
                        <Menu.Item name={'ПОИСК'}/>
                    </NavLink>
                    <NavLink to={'/structure'} activeClassName="ActivePageLink">
                        <Menu.Item name={'СТРУКТУРА'}/>
                    </NavLink>
                    {this.getLinks()}
                    <Menu.Menu position='right'>
                        {this.getButtons()}
                        {this.getAuthorisationForm()}
                    </Menu.Menu>
                </Menu>
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        userForAuthorisation: state.userForAuthorisation,
    };
}

export default connect(mapStateToProps)(Header);