import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import {FieldControl, FieldGroup, FormBuilder, Validators,} from "react-reactive-form";
import {Button, Confirm} from "semantic-ui-react";
import {get, isEqual} from "lodash";
import {toast} from "react-toastify";

import {carryDepartment, updateStructureTry} from "../../store/actions/departmentActions";
import {getStructure} from "../../utils/api";
import Loader from "../Loader/Loader";


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

const SelectInput = ({handler, touched, hasError, meta}) => {
    const variants = meta.variants.map((val, index) => (
        <option value={val.id} key={index}>{val.name}</option>
    ));
    return (
        <div className={'edit-structure-input'}>
            <select {...handler()}>
                <option value='' disabled>{`Выберите ${meta.label}`}</option>
                {variants}
            </select>
            {touched
            && hasError("required")
            && `Поле обязательно для ввода`}
        </div>
    )
};

class CarryModal extends React.PureComponent {

    static propTypes = {
        department: PropTypes.object.isRequired,
    };

    constructor() {
        super();
        this.state = {
            status: 0,
            structure: [],
            error: '',
            initialValue: '',
            isChanging: false,
            requestError: false,
        };
    }

    componentDidMount() {
        const {department} = this.props;
        this.editedForm = FormBuilder.group({
            parent: [department.carriedDepartment.parent, Validators.required],
        });
        this.setState({initialValue: this.editedForm.value});
        this.getStructureTry();

    }

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
        this.editedForm.reset();
        this.removeModal();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const parent = Number(this.editedForm.value.parent);
        const result = {...this.editedForm.value, parent: parent};
        const {carriedDepartment: {children, ...withoutChildren}} = this.props.department;
        const updatedDepartment = {...withoutChildren, ...result};
        this.props.dispatch(updateStructureTry(this.props.dispatch, updatedDepartment))
            .then(() => this.removeModal())
            .then(() => toast("Данные изменены"))
            .catch((data) => this.setState({
                    requestError: data,
                }
            ));
    };

    removeModal = () => {
        this.props.dispatch(carryDepartment(this.props.dispatch, null));
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

    checkRequestStatus = () => {
        return this.state.status === 2 ?
            <div>
                <div className={'request-error'}>{this.props.department.error}</div>
                <Button onClick={this.removeModal}>Отмена</Button>
            </div> :
            <Loader/>
    };

    showRequestError = () => {
        return this.state.requestError ? <div className={'request-error'}>{this.state.requestError}</div> : null;
    };

    showForm = () => {
        const variants = this.state.structure;
        return (this.state.initialValue && this.state.status === 3) ? (
            <div>
                {this.showRequestError()}
                <FieldGroup
                    control={this.editedForm}
                    render={({get, invalid}) => (
                        <form onSubmit={this.handleSubmit} onClick={e => e.stopPropagation()}>

                            <FieldControl
                                name="parent"
                                render={SelectInput}
                                meta={{label: "name", variants: variants}}
                            />

                            <div className={'modal-buttons'}>
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
        ) : this.checkRequestStatus();
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

const CarryModalComponent = connect(mapStateToProps)(CarryModal);

export default CarryModalComponent;