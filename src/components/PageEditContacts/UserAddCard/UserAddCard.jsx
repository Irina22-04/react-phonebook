import React from "react";
import {get} from "lodash";
import {Button, Confirm, Modal} from "semantic-ui-react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getStructure} from "../../../utils/api";
import {addNewContactTry} from "../../../store/actions/editUserActions";
import Loader from "../../Loader/Loader";
import AddUserForm from "./AddUserForm";
import "./UserAddCard.css";

class UserAddCard extends React.PureComponent {

    static propTypes = {
        usersListForEdit: PropTypes.object.isRequired,
        stopEdit: PropTypes.func.isRequired,
        editNewUserCB: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            structure: [],
            status: 0,
            error: '',
            isChanging: false,
            requestError: false
        }
    }

    componentDidMount() {
        return this.getStructureTry();
    };

    getStructureTry = async () => {
        this.setState({
            status: 1
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
                        error: get(e, ['response', 'data', 'error_message'], e.message)
                    });
                }
            )
    };

    handleReset = () => {
        this.closeConfirm();
        this.props.stopEdit();
    };

    handleSubmit = (value) => {

        const additionalProps = {
            businessMobile: '',
            personalMobile: '',
            personalEmail: '',
            birthday: '',
            isAdmin: false,
        };

        this.props.dispatch(addNewContactTry(this.props.dispatch, {...value, ...additionalProps}))
            .then(() => {
                this.props.stopEdit();
                this.props.editNewUserCB();
            })
            .catch((data) => this.setState({
                    requestError: data,
                }
            ))
    };

    switchIsChanging = (isChanging) => {
        this.setState({
            isChanging: isChanging,
        })
    };

    closeConfirm = () => {
        this.setState({
            isChanging: false,
        });
    };

    checkRequestError = () => {
        return this.state.status === 2 ? <div>
                <div className={'request-error'}>{this.state.error}</div>
                <Button onClick={this.handleReset}>Отмена</Button></div> :
            <AddUserForm cbSwitchIsChanging={this.switchIsChanging}
                         cbHandleReset={this.handleReset}
                         cbHandleSubmit={this.handleSubmit}
                         variants={this.state.structure}/>;
    };

    showRequestError = () => {
        return this.state.requestError ? <div className={'request-error'}>{this.state.requestError}</div> : null;
    };

    render() {
        return this.state.status <= 1 ? <Loader/> : (
            <div>
                <Modal open={true}>
                    <Modal.Header>Внесение нового работника</Modal.Header>
                    <Modal.Content>
                        {this.showRequestError()}
                        {this.checkRequestError()}
                    </Modal.Content>
                </Modal>
                <Confirm
                    open={this.state.isChanging}
                    content={`Вы действительно хотите покинуть страницу?`}
                    onCancel={this.closeConfirm}
                    onConfirm={this.handleReset}
                />
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        usersListForEdit: state.usersListForEdit,
    };
}

export default connect(mapStateToProps)(UserAddCard);