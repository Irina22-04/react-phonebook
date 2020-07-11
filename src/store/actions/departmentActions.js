import {get} from "lodash";

import {addStructure, deleteStructure, getStructure, updateStructure} from "../../utils/api";

export const STRUCTURE_LOADING = 'STRUCTURE_LOADING';
export const STRUCTURE_SET = 'STRUCTURE_SET';
export const STRUCTURE_ERROR = 'STRUCTURE_ERROR';
export const EDIT_DEPARTMENT = 'SET_EDIT_DEPARTMENT';
export const SET_DEPARTMENT = 'SET_DEPARTMENT';
export const STRUCTURE_UPDATE = 'STRUCTURE_UPDATE';
export const STRUCTURE_DELETE = 'STRUCTURE_DELETE';
export const SET_PARENT_DEPARTMENT = 'SET_PARENT_DEPARTMENT';
export const STRUCTURE_ADD = 'STRUCTURE_ADD';
export const CARRY_DEPARTMENT = 'CARRY_DEPARTMENT';
export const SET_DELETE_DEPARTMENT_ERROR = 'SET_DELETE_DEPARTMENT_ERROR';
export const REMOVE_DELETE_DEPARTMENT_ERROR = 'REMOVE_DELETE_DEPARTMENT_ERROR';

export function setDepartment(dispatch, department) {
    return dispatch({
        type: SET_DEPARTMENT,
        payload: department,
    })

}

export function editDepartment(dispatch, department) {
    return dispatch({
        type: EDIT_DEPARTMENT,
        payload: department,
    })

}

export function getStructureTry(dispatch) {
    return async function () {
        dispatch({type: STRUCTURE_LOADING});
        await getStructure()
            .then(data => {
                dispatch({
                    type: STRUCTURE_SET,
                    payload: data.data,
                })
            })
            .catch(e => {
                dispatch({
                    type: STRUCTURE_ERROR,
                    payload: get(e, ['response', 'data', 'error_message'], e.message)
                });
            });
    }
}

export function updateStructureTry(dispatch, department) {
    return async function () {
        await updateStructure(department)
            .then(data => {
                dispatch({
                    type: STRUCTURE_UPDATE,
                    payload: data.data,
                })
            })
            .catch(e => {
                return Promise.reject(e.message);
            });
    }
}

export function deleteStructureTry(dispatch, department) {
    return async function () {
        await deleteStructure(department)
            .then(() => {
                dispatch({
                    type: STRUCTURE_DELETE,
                    payload: department,
                })
            })
            .catch(e => {
                return Promise.reject(e.message);
            });
    }
}

export function addChildrenDepartment(dispatch, parentDepartment) {
    return dispatch({
        type: SET_PARENT_DEPARTMENT,
        payload: parentDepartment,
    })

}

export function addStructureTry(dispatch, department) {
    return async function () {
        await addStructure(department)
            .then((data) => {
                dispatch({
                    type: STRUCTURE_ADD,
                    payload: data.data,
                });
            })
            .catch(e => {
                return Promise.reject(e.message);
            });
    }
}

export function carryDepartment(dispatch, department) {
    return dispatch({
        type: CARRY_DEPARTMENT,
        payload: department,
    })
}

export function deleteDepartmentError(dispatch, error) {
    return dispatch({
        type: SET_DELETE_DEPARTMENT_ERROR,
        payload: error,
    })
}

export function removeDeleteDepartmentError(dispatch) {
    return dispatch({
        type: REMOVE_DELETE_DEPARTMENT_ERROR,
    })
}
