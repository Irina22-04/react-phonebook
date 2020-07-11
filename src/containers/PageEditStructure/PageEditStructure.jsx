import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {getStructureTry, removeDeleteDepartmentError} from "../../store/actions/departmentActions";
import {makeStairs} from "../../utils/helper";
import EditStructureStepComponent from "../../components/EditStructureStep/EditStructureStep/EditStructureStep";
import EditModalComponent from "../../components/Modal/EditModal/EditModal";
import AddModalComponent from "../../components/Modal/AddModal";
import CarryModalComponent from "../../components/Modal/CarryModal";
import Loader from "../../components/Loader/Loader";
import "./PageEditStructure.css";

class PageEditStructure extends React.PureComponent {

    static propTypes = {
        department: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.dispatch(getStructureTry(this.props.dispatch));
    };

    showModal = () => {
        const {editDepartment} = this.props.department;
        return editDepartment ? <EditModalComponent/> : null;
    };

    showAddModal = () => {
        const {parentDepartment} = this.props.department;
        return parentDepartment ? <AddModalComponent/> : null;
    };

    showCarryModal = () => {
        const {carriedDepartment} = this.props.department;
        return carriedDepartment ? <CarryModalComponent/> : null;
    };

    checkRequestStatus = () => {
        return this.props.department.status === 2 ?
            <div className={'request-error'}>{this.props.department.error}</div> :
            <Loader/>
    };

    checkDeleteError = () => {
        return this.props.department.deleteDepartmentError ? <div className={'request-error structure-error'}>
            {this.props.department.deleteDepartmentError}</div> : null;
    };

    deleteError = () => {
        return this.props.dispatch(removeDeleteDepartmentError(this.props.dispatch));
    };

    render() {
        const {department} = this.props;
        return department.status <= 2 ? this.checkRequestStatus() : (
            <div onClick={this.deleteError} className={'structure-page edit-structure'}>
                {this.checkDeleteError()}
                <div className={'page-title edit-page-title'}>Структура компании</div>
                <div className={'structure'}>
                    <EditStructureStepComponent step={department.structure}/>
                    {this.showModal()}
                    {this.showAddModal()}
                    {this.showCarryModal()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        department: makeStairs(state.department),
    };
}

export default connect(mapStateToProps)(PageEditStructure);