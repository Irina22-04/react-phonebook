import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import {Confirm, Icon} from "semantic-ui-react";
import {get} from "lodash";
import {toast} from "react-toastify";

import {getEmployeesByStructure} from "../../../utils/api";
import DeleteBanEdit from "../DeleteBanEdit/DeleteBanEdit";
import EditStructureButtons from "../EditStructureButtons/EditStructureButtons";
import {
    addChildrenDepartment,
    carryDepartment,
    deleteDepartmentError,
    deleteStructureTry,
    editDepartment,
    setDepartment,
} from "../../../store/actions/departmentActions";
import "./EditStructureStep.css";


const NameWrapper = styled('div')`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    cursor: pointer;
    font-size: 1.3rem;
    line-height: 1.5rem;
   
`;

const NameWithActions = styled('div')`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    height: 2rem;
`;

const Children = styled('div')`
    margin-left: 20px
`;

class EditStructureStep extends React.PureComponent {

    static propTypes = {
        department: PropTypes.object.isRequired,
        step: PropTypes.object.isRequired,
    };

    constructor() {
        super();
        this.state = {
            isOpen: false,
            openConfirm: false,
            status: 0,
            employees: '',
            error: '',
            openBanDelete: false,
        }
    }

    checkArrow = () => {
        const {children = []} = this.props.step;

        return children.length ? this.createSign() : null;
    };

    createSign = () => {
        const {isOpen} = this.state;
        const sign = isOpen ? 'angle down' : 'angle right';
        return <div><Icon name={sign}/></div>;
    };

    handleEdit = () => {
        const {step} = this.props;
        this.props.dispatch(editDepartment(this.props.dispatch, step));
    };

    renderChildren = () => {
        const {isOpen} = this.state;
        const {children = []} = this.props.step;
        if (isOpen) {
            return (
                <Children>
                    {children.map((child, index) => <EditStructureStepComponent key={index} step={child}/>)}
                </Children>
            )
        }
        return null
    };

    openChildren = () => {
        this.setState({isOpen: !this.state.isOpen})
    };

    checkEmployees = () => {
        const deletedElementId = this.props.step.id;
        this.getEmployeesByStructureTry(deletedElementId)
            .then(() => {
                if (this.state.employees.length > 0) {
                    return this.setState({openBanDelete: true})
                }
                return this.openConfirm();
            });

    };

    handleDelete = () => {
        const deletedElementId = this.props.step.id;

        this.props.dispatch(deleteStructureTry(this.props.dispatch, deletedElementId))
            .then(() => toast("Подразделение удалено"))
            .catch((data) => this.props.dispatch(deleteDepartmentError(this.props.dispatch, data)));
        return this.closeConfirm()
    };

    getEmployeesByStructureTry = async (department) => {
        this.setState({status: 1});
        return await getEmployeesByStructure(department)
            .then(data => {
                this.setState({
                    status: 3,
                    employees: data.data,
                });
            })
            .catch(e => {
                this.setState({
                    status: 2,
                    error: get(e, ['response', 'data', 'error_message'], e.message)
                });
            });

    };

    handleAdd = () => {
        const parentElementId = this.props.step.id;
        this.props.dispatch(addChildrenDepartment(this.props.dispatch, parentElementId));
    };

    handleCarry = () => {
        const {step} = this.props;
        this.props.dispatch(carryDepartment(this.props.dispatch, step));
    };

    openConfirm = () => {
        this.setState({openConfirm: true})
    };

    closeConfirm = () => {
        this.setState({openConfirm: false});
    };

    selectStep = (e) => {
        const selectStep = e.currentTarget.getAttribute('id');
        this.props.dispatch(setDepartment(this.props.dispatch, selectStep));
    };

    showBanDelete = () => {
        return this.state.openBanDelete ? <DeleteBanEdit stopShow={this.stopShowDeleteBan}/> : null;
    };

    stopShowDeleteBan = () => {
        this.setState({openBanDelete: false})
    };

    render() {
        const {step} = this.props;
        const department = Number(this.props.department.department);
        return (
            <div>
                <NameWithActions id={step.id} onClick={this.selectStep}
                                 className={department === step.id ? "set-department" : ""}>

                    <NameWrapper onClick={this.openChildren}>
                        {this.checkArrow()}
                        <div className={'folder-name'}>{step.name}</div>
                    </NameWrapper>

                    <EditStructureButtons step={this.props.step} cbHandleCarry={this.handleCarry}
                                          cbCheckEmployees={this.checkEmployees} cbHandleEdit={this.handleEdit}
                                          cbHandleAdd={this.handleAdd}/>

                </NameWithActions>
                {this.renderChildren()}

                {this.showBanDelete()}

                <Confirm
                    open={this.state.openConfirm}
                    content={`Вы действительно хотите удалить ${this.props.step.name}?`}
                    onCancel={this.closeConfirm}
                    onConfirm={this.handleDelete}
                />

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        department: state.department,
    };
}

const EditStructureStepComponent = connect(mapStateToProps)(EditStructureStep);

export default EditStructureStepComponent;