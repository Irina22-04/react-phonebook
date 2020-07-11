import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import {Icon, List} from "semantic-ui-react";
import {getEmployeesByStructureTry} from "../../../store/actions/employeesListActions";
import "./EmployeesList.css";

class EmployeesList extends React.PureComponent {

    static propTypes = {
        employeesListForDepartment: PropTypes.object.isRequired,
    };

    createEmployee = () => {
        const {employeesListForDepartment} = this.props;
        if (!employeesListForDepartment || employeesListForDepartment.length === 0) {
            return;
        }

        return employeesListForDepartment.employeesList.map(employee => (
            <Link to={`/user/${employee.id}`} key={employee.id} target='_blank'>
                <List.Item className={'employeer'}>
                    <List.Header>
                        <Icon name='circle'/>{`${employee.surname} ${employee.name} ${employee.patronym}`}
                    </List.Header>
                    {employee.position}
                </List.Item>
            </Link>
        ));
    };

    componentWillUnmount() {
        this.props.dispatch(getEmployeesByStructureTry(this.props.dispatch, ''));
    }

    render() {
        return this.props.employeesListForDepartment.status === 2 ?
            <div className={'request-error'}>{this.props.employeesListForDepartment.error}</div> : (
                <List className={'employees-list'}>
                    {this.createEmployee()}
                </List>
            )
    }
}

function mapStateToProps(state) {
    return {
        employeesListForDepartment: state.employeesListForDepartment,
    };
}

export default connect(mapStateToProps)(EmployeesList);