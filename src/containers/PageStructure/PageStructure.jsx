import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Folder from "../../components/PageStructure/Folder/Folder";
import EmployeesList from "../../components/PageStructure/EmployeesList/EmployeesList";
import Loader from "../../components/Loader/Loader";
import {getStructureTry, setDepartment} from "../../store/actions/departmentActions";
import "./PageStructure.css";

class PageStructure extends React.PureComponent {

    static propTypes = {
        department: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.dispatch(getStructureTry(this.props.dispatch));
    };

    componentWillUnmount() {
        this.props.dispatch(setDepartment(this.props.dispatch, ''));
    }

    checkRequestStatus = () => {
        return this.props.department.status === 2 ?
            <div className={'request-error'}>{this.props.department.error}</div> :
            <Loader/>
    };

    render() {
        return this.props.department.status <= 2 ?
            this.checkRequestStatus() : (
                <div className={'structure-page'}>
                    <div className={'page-title'}>Структура компании</div>
                    <div className={'structure'}>
                        <div className={'structure-container'}>
                            <Folder folderId={1}/>
                        </div>
                        <EmployeesList/>
                    </div>
                </div>
            )
    }
}

function mapStateToProps(state) {
    return {
        department: state.department,
    };
}

export default connect(mapStateToProps)(PageStructure);