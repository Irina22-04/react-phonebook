import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Button, Confirm, Input} from "semantic-ui-react";
import {FieldControl, FieldGroup, FormBuilder, Validators,} from "react-reactive-form";
import {isEqual} from "lodash";
import {toast} from "react-toastify";

import {editDepartment, updateStructureTry} from "../../../store/actions/departmentActions";
import Loader from "../../Loader/Loader";
import "./EditModal.css";


const BackGround = styled('div')`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
`;
const TextInput = ({handler, touched, hasError, meta}) => (
    <div className={'edit-structure-input'}>
        <Input fluid placeholder={`Введите ${meta.label}`} {...handler()}/>
        <span className={'error-span'}>
        {touched
        && hasError("required")
        && `Поле обязательно для ввода`}
    </span>
    </div>
);

class EditModal extends React.PureComponent {

    static propTypes = {
        department: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            initialValue: '',
            isChanging: false,
            requestError: false,
        };
    }

    componentDidMount() {
        const {editDepartment} = this.props.department;
        this.editedForm = FormBuilder.group({
            name: [editDepartment.name, Validators.required],
        });
        this.setState({
            initialValue: this.editedForm.value,
        })
    }

    handleReset = () => {
        this.closeConfirm();
        this.editedForm.reset();
        this.removeModal();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {editDepartment: {children, ...withoutChildren}} = this.props.department;
        const updatedDepartment = {...withoutChildren, ...this.editedForm.value};
        this.props.dispatch(updateStructureTry(this.props.dispatch, updatedDepartment))
            .then(() => this.removeModal())
            .then(() => toast("Данные изменены"))
            .catch((data) => this.setState({
                    requestError: data,
                }
            ));
    };

    removeModal = () => {
        this.props.dispatch(editDepartment(this.props.dispatch, null));
    };

    checkChanges = () => {
        return isEqual(this.editedForm.value, this.state.initialValue);
    };

    showChanges = () => {
        let isChanging = !this.checkChanges();
        if (isChanging) {
            return this.setState({isChanging: isChanging});
        }
        return this.removeModal();
    };

    closeConfirm = () => {
        this.setState({
            isChanging: false,
        });
    };

    showRequestError = () => {
        return this.state.requestError ? <div className={'request-error'}>{this.state.requestError}</div> : null;
    };

    showForm = () => {
        return this.state.initialValue ? (
            <div>
                {this.showRequestError()}
                <FieldGroup
                    control={this.editedForm}
                    render={({get, invalid}) => (
                        <form onSubmit={this.handleSubmit} onClick={e => e.stopPropagation()}>

                            <FieldControl
                                name="name"
                                render={TextInput}
                                meta={{label: "название"}}
                            />

                            <div className={'modal-buttons'}>
                                <Button
                                    type="button"
                                    onClick={this.editedForm.reset}
                                >
                                    Очистить
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={invalid || this.checkChanges()}
                                >
                                    Сохранить
                                </Button>
                                <Button
                                    type="button"
                                    onClick={this.showChanges}
                                >
                                    Отмена
                                </Button>
                            </div>
                        </form>
                    )}
                />
                <Confirm
                    open={this.state.isChanging}
                    content={`Вы действительно хотите покинуть страницу?`}
                    onCancel={this.closeConfirm}
                    onConfirm={this.handleReset}
                />

            </div>
        ) : <Loader/>
    };

    render() {
        return (
            <BackGround>
                {this.showForm()}
            </BackGround>
        )
    }
}


function mapStateToProps(state) {
    return {
        department: state.department,
    };
}

const EditModalComponent = connect(mapStateToProps)(EditModal);

export default EditModalComponent;