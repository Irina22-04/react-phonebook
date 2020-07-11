import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {get} from "lodash";

import {getVisibleContacts} from "../../../store/selectors/contactSelectors";
import {getStructure} from "../../../utils/api";
import Loader from "../../Loader/Loader";
import "./SearchResult.css";

class SearchResult extends React.PureComponent {

    static propTypes = {
        contacts: PropTypes.object.isRequired,
    };

    constructor() {
        super();
        this.state = {
            structure: [],
            status: 0,
            error: '',
        }
    }

    componentDidMount() {
        return this.getStructureTry();
    };

    getStructureTry = async () => {
        this.setState({
            status: 1,
        });
        return await getStructure()
            .then(data => {
                this.setState({
                    status: 3,
                    structure: data.data,
                })
            })
            .catch(e => {
                    this.setState({
                        status: 2,
                        error: get(e, ['response', 'data', 'error_message'], e.message),
                    });
                }
            )
    };

    contactsSet = (contacts) => {
        return contacts.length ? contacts.map(contact => {
            const department = this.state.structure
                .find(structure => Number(structure.id) === Number(contact.department))
                .name;
            return (
                <NavLink to={`/user/${contact.id}`} key={contact.id}>
                    <div className={'contact contact-item'}>
                        <div className={'contact-name'}>
                            <span>{contact.surname}</span>&ensp;
                            <span>{contact.name}</span>&ensp;
                            <span>{contact.patronym}</span>&ensp;
                        </div>
                        <div className={'contact-department'}>{department}</div>
                        <div className={'contact-position'}>{contact.position}</div>
                        <div className={'contact-phone'}>{contact.phone}</div>
                    </div>
                </NavLink>
            )
        }) : <div className={'no-contact'}>По заданным параметрам данные не найдены</div>;
    };

    render() {
        const {contacts} = this.props;

        return (contacts.status <= 1 || this.state.status <= 1) ? <Loader/> : (
            <div className={'contacts-container'}>
                <div className={'contact'}>
                    <div className={'contact-name contact-header'}>ФИО</div>
                    <div className={'contact-department contact-header'}>Подразделение</div>
                    <div className={'contact-position contact-header'}>Должность</div>
                    <div className={'contact-phone contact-header'}>Телефон</div>
                </div>
                {this.contactsSet(contacts.contacts)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        contacts: getVisibleContacts(state),
    };
}

export default connect(mapStateToProps)(SearchResult);