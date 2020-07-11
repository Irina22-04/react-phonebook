import {EMPLOYEES_LOADING, EMPLOYEES_SET, EMPLOYEES_ERROR} from "../actions/employeesListActions";

const initialState = {
    status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
    employeesList: [],
    error: '',
};

const employeesListForDepartment = (state = initialState, {type, payload}) => {
    switch (type) {
        case EMPLOYEES_LOADING: {
            return {
                ...state,
                status: 1,
                employeesList: [],
                error: ''
            }
        }
        case EMPLOYEES_SET: {
            return {
                ...state,
                status: 3,
                employeesList: payload,
                error: ''
            }
        }
        case EMPLOYEES_ERROR: {
            return {
                ...state,
                status: 2,
                employeesList: [],
                error: payload
            }
        }

        default:
            return state;
    }
};

export default employeesListForDepartment;