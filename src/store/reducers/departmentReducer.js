import {
    SET_DEPARTMENT,
    STRUCTURE_ERROR,
    STRUCTURE_LOADING,
    STRUCTURE_SET,
    EDIT_DEPARTMENT,
    STRUCTURE_UPDATE,
    STRUCTURE_DELETE,
    SET_PARENT_DEPARTMENT,
    STRUCTURE_ADD,
    CARRY_DEPARTMENT,
    SET_DELETE_DEPARTMENT_ERROR,
    REMOVE_DELETE_DEPARTMENT_ERROR
} from "../actions/departmentActions";

const initialState = {
    department: '',
    structure: [],
    status: 0,
    error: '',
    editDepartment: '',
    parentDepartment: '',
    carriedDepartment: '',
    deleteDepartmentError: false,
};

const department = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_DEPARTMENT: {
            return {
                ...state,
                department: payload,
            }
        }
        case EDIT_DEPARTMENT: {
            return {
                ...state,
                editDepartment: payload,
            }
        }
        case SET_PARENT_DEPARTMENT: {
            return {
                ...state,
                parentDepartment: payload,
            }
        }
        case CARRY_DEPARTMENT: {
            return {
                ...state,
                carriedDepartment: payload,
            }
        }
        case STRUCTURE_LOADING: {
            return {
                ...state,
                status: 1,
            }
        }
        case STRUCTURE_SET: {
            return {
                ...state,
                status: 3,
                structure: payload,
            }
        }
        case STRUCTURE_ERROR: {
            return {
                ...state,
                status: 2,
                error: payload
            }
        }
        case STRUCTURE_UPDATE: {
            return {
                ...state,
                structure: state.structure.map(element => element.id === payload.id ? payload : element)
            }
        }
        case STRUCTURE_DELETE: {
            return {
                ...state,
                structure: state.structure.filter(department => department.id !== payload)
            }
        }
        case STRUCTURE_ADD: {
            return {
                ...state,
                status: 3,
                structure: [...state.structure, payload]
            }
        }
        case SET_DELETE_DEPARTMENT_ERROR: {
            return {
                ...state,
                deleteDepartmentError: payload,
            }
        }
        case REMOVE_DELETE_DEPARTMENT_ERROR: {
            return {
                ...state,
                deleteDepartmentError: false,
            }
        }
        default:
            return state;
    }
};

export default department;