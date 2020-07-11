import React from "react";
import {slide as Slide} from "react-burger-menu";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Menu} from "semantic-ui-react";

import {leaveAccount, setUserAuthorisation} from "../../store/actions/authorisationUserActions";
import AuthorisationForm from "../../components/AuthorisationForm/AuthorisationForm";
import "./Sidebar.css";


class Sidebar extends React.PureComponent {

    static propTypes = {
        userForAuthorisation: PropTypes.object.isRequired,
    };

    getLinks = () => {
        return this.props.userForAuthorisation.isAdmin ? (
            <React.Fragment>
                <NavLink onClick={() => this.closeMenu()} to={'/edit'} activeClassName="ActivePageLink"
                         className="bm-item menu-item">
                    РЕДАКТИРОВАНИЕ ПОЛЬЗОВАТЕЛЕЙ
                </NavLink>

                <NavLink onClick={() => this.closeMenu()} to={'/editStructure'} activeClassName="ActivePageLink"
                         className="bm-item menu-item">
                    РЕДАКТИРОВАНИЕ СТРУКТУРЫ
                </NavLink>
            </React.Fragment>) : null;
    };

    getAuthorisationForm = () => {
        return this.props.userForAuthorisation.isAuthorisation ? <AuthorisationForm/> : null;
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

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
    }

    handleStateChange(state) {
        this.setState({menuOpen: state.isOpen})
    }

    closeMenu() {
        this.setState({menuOpen: false})
    }

    toggleMenu() {
        this.setState(state => ({menuOpen: !state.menuOpen}))
    }

    render() {
        return (
            <div>
                <div className={'burger-header'}>
                    <Menu position='right'>
                        {this.getButtons()}
                        {this.getAuthorisationForm()}
                    </Menu>
                </div>
                <Slide disableAutoFocus isOpen={this.state.menuOpen}
                       onStateChange={(state) => this.handleStateChange(state)} className={'sidebar'}>
                    <NavLink onClick={() => this.closeMenu()} to={'/search'} activeClassName="ActivePageLink"
                             className="menu-item">
                        ПОИСК
                    </NavLink>
                    <NavLink onClick={() => this.closeMenu()} to={'/structure'} activeClassName="ActivePageLink"
                             className="menu-item">
                        СТРУКТУРА
                    </NavLink>
                    {this.getLinks()}

                </Slide>
                <div onClick={() => this.toggleMenu()}/>
            </div>
        )
            ;
    }
}

function mapStateToProps(state) {
    return {
        userForAuthorisation: state.userForAuthorisation,
    };
}

export default connect(mapStateToProps)(Sidebar);