import React from "react";
import {get} from "lodash";
import PropTypes from "prop-types";
import {toast} from "react-toastify";
import {Prompt} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {connect} from "react-redux";

import Loader from "../../components/Loader/Loader";
import EditUserForm from "../../components/PageEditUser/EditUserForm/EditUserForm";
import {getContactById, getStructure} from "../../utils/api";
import {editContactTry} from "../../store/actions/editUserActions";
import "./PageEditUser.css";

class PageUserForEdit extends React.PureComponent {

    static propTypes = {
        usersListForEdit: PropTypes.object.isRequired,
    };

    constructor() {
        super();
        this.state = {
            user: '',
            status: 0,
            error: '',
            structure: [],
            structureStatus: 0,
            showModal: false,
            isChanging: false,
            renderForm: false,
            requestError: false,
        }
    }

    componentDidMount() {
        let {id} = this.props.match.params;
        id = Number(id);
        Promise.all([this.getUserTry(id), this.getStructureTry()])
            .then(() => (this.setState({renderForm: true})));
    };

    setIsChanging = (val) => {
        this.setState({isChanging: val})
    };

    getUserTry = async (id) => {
        this.setState({
            status: 1
        });
        return await getContactById(id)
            .then(data => {
                this.setState({
                    status: 3,
                    user: data.data,
                })
            })
            .catch(e => {
                    this.setState({
                        status: 2,
                        error: get(e, ['response', 'data', 'error_message'], e.message)
                    });
                }
            )
    };

    getStructureTry = async () => {
        this.setState({
            structureStatus: 1
        });
        return await getStructure()
            .then(data => {
                this.setState({
                    structureStatus: 3,
                    structure: data.data,
                })
            })
            .catch(e => {
                    this.setState({
                        structureStatus: 2,
                        error: get(e, ['response', 'data', 'error_message'], e.message)
                    });
                }
            )
    };

    handleReset = () => {
        return this.props.history.push("/edit");
    };

    handleSubmit = (formValue) => {
        this.props.dispatch(editContactTry(this.props.dispatch,
            {...this.state.user, ...formValue}))
            .then(() => this.setState({isChanging: false})
            )
            .then(() => {
                toast("Данные изменены");
                this.props.history.push("/edit");
            })
            .catch((data) => this.setState({
                    requestError: data,
                }
            ))
    };

    showForm = () => {
        return this.state.renderForm ? <EditUserForm user={this.state.user} cbSetIsChanging={this.setIsChanging}
                                                     cbHandleReset={this.handleReset}
                                                     cbHandleSubmit={this.handleSubmit}
                                                     variants={this.state.structure}/> : null;
    };

    checkRequestStatus = () => {
        return this.state.status === 2 || this.state.structureStatus === 2 ?
            <div className={'request-error'}>{this.state.error}</div> :
            <Loader/>
    };

    showRequestError = () => {
        return this.state.requestError ? <div className={'request-error'}>{this.state.requestError}</div> : null;
    };

    render() {
        return this.state.status <= 2 || this.state.structureStatus <= 2 ? this.checkRequestStatus() : (

            <div className={'edit-page-container'}>
                <Prompt
                    when={this.state.isChanging}
                    message="Вы действительно хотите покинуть страницу?"
                />
                <div className={'page-title'}>Редактирование пользователя</div>
                {this.showRequestError()}
                {this.showForm()}

                <div className={'hint'}>Поля, помеченные <span className={'star-span'}>&#10033;</span>
                    обязательны для заполнения.
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        usersListForEdit: state.usersListForEdit,
    };
}

export default connect(mapStateToProps)(PageUserForEdit);