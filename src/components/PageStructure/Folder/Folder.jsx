import React from "react";
import {connect} from "react-redux";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import PropTypes from "prop-types";

import {getEmployeesByStructureTry} from "../../../store/actions/employeesListActions";
import {setDepartment} from "../../../store/actions/departmentActions";
import "./Folder.css";

class prevFolder extends React.PureComponent {

    static propTypes = {
        employeesListForDepartment: PropTypes.object.isRequired,
        department: PropTypes.object.isRequired,
        folderId: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            children: null,
        }
    }

    componentDidMount() {
        if (this.props.department.status === 3) {
            this.setState({
                children: this.props.department.structure.filter(department => department.parent === this.props.folderId),
            })
        }
    }

    checkArrow = () => {
        const {children} = this.state;

        const isChildren = children && children.length;
        return isChildren ? this.createSign() : null;
    };

    createSign = () => {
        const {isSelected} = this.state;
        const sign = isSelected ? '-' : '+';
        return <div className={'sign'}>{sign}</div>
    };

    switchSelect = (e) => {

        const {isSelected} = this.state;
        this.setState({
            isSelected: !isSelected,
        });

        let department = e.currentTarget.getAttribute('id');

        if (department) {
            this.getEmployeesByDepartment(department);
            this.setDepartment(department);
        }

    };

    setDepartment = (department) => {
        this.props.dispatch(setDepartment(this.props.dispatch, department));
    };

    getEmployeesByDepartment = (department) => {
        this.props.dispatch(getEmployeesByStructureTry(this.props.dispatch, department));
    };

    showChildren = () => {

        const {isSelected} = this.state;
        if (!isSelected) {
            return null;
        }
        const {children} = this.state;
        if (!children || children.length === 0) {
            return null;
        }

        return children.map(child => (
            <CSSTransition timeout={200} classNames="item" key={child.name}>
                <Folder folderId={child.id}/>
            </CSSTransition>)
        );
    };

    render() {
        const department = Number(this.props.department.department);
        const departmentName = this.props.department.structure ? this.props.department.structure.find(item => item.id === this.props.folderId) : null;

        return this.props.department.status <= 1 ? null : (
            <div className={"department-wrapper folder"}>
                <div
                    id={this.props.folderId}
                    className={department === this.props.folderId ? "set-department name-wrapper" : "name-wrapper"}
                    onClick={this.switchSelect}>
                    {this.checkArrow()}
                    {departmentName.name}
                </div>
                <TransitionGroup className={"folders-wrapper"}>
                    {this.showChildren()}
                </TransitionGroup>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        employeesListForDepartment: state.employeesListForDepartment,
        department: state.department,
    };
}

const Folder = connect(mapStateToProps)(prevFolder);

export default Folder;