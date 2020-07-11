import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import {FieldControl, FieldGroup, FormBuilder, Validators,} from "react-reactive-form";
import {Button, Confirm, Input} from "semantic-ui-react";
import {isEqual} from "lodash";
import {toast} from "react-toastify";

import Loader from "../Loader/Loader";
import {addChildrenDepartment, addStructureTry} from "../../store/actions/departmentActions";


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

class AddModal extends React.PureComponent {

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
        this.editedForm = FormBuilder.group({
            name: ['', Validators.required],
        });
        this.setState({initialValue: this.editedForm.value});
    }

    handleReset = () => {
        this.closeConfirm();
        this.editedForm.reset();
        this.removeModal();
    };

    inputHandleReset = () => {
        this.closeConfirm();
        this.editedForm.reset();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const parent = this.props.department.parentDepartment;
        const newDepartment = {...this.editedForm.value, parent: parent};
        this.props.dispatch(addStructureTry(this.props.dispatch, newDepartment))
            .then(() => this.removeModal())
            .then(() => toast("Подразделение добавлено"))
            .catch((data) => this.setState({
                    requestError: data,
                }
            ));
    };

    removeModal = () => {
        this.props.dispatch(addChildrenDepartment(this.props.dispatch, null));
    };

    checkChanges = () => {
        let isChanging = !isEqual(this.editedForm.value, this.state.initialValue);
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
                                meta={{label: "наименование"}}
                            />
                            <div className={'modal-buttons'}>
                                <Button
                                    type="button"
                                    onClick={this.inputHandleReset}
                                >
                                    Очистить
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={invalid}
                                >
                                    Сохранить
                                </Button>
                                <Button
                                    type="button"
                                    onClick={this.checkChanges}
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

const AddModalComponent = connect(mapStateToProps)(AddModal);

export default AddModalComponent;