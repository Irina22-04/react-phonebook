import {get} from "lodash";

import {getEmployeesByStructure} from "../../utils/api";

export const EMPLOYEES_LOADING = 'EMPLOYEES_LOADING';
export const EMPLOYEES_SET = 'EMPLOYEES_SET';
export const EMPLOYEES_ERROR = 'EMPLOYEES_ERROR';

export function getEmployeesByStructureTry(dispatch, department) {
    return async function () {
        dispatch({type: EMPLOYEES_LOADING});
        await getEmployeesByStructure(department)
            .then(data => {
                dispatch({
                    type: EMPLOYEES_SET,
                    payload: data.data,
                })
            })
            .catch(e => {
                dispatch({
                    type: EMPLOYEES_ERROR,
                    payload: get(e, ['response', 'data', 'error_message'], e.message)
                });
            });
    }
}
