import {get} from "lodash";
import jwt_decode from "jwt-decode";

import {getContactById, loginUser} from "../../utils/api";

export const USER_AUTHORISATION = 'USER_AUTHORISATION';
export const LOGIN_TRY = 'LOGIN_TRY';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LEAVE_ACCOUNT = 'LEAVE_ACCOUNT';

export function setUserAuthorisation(dispatch, authorisationState) {
    return dispatch({
        type: USER_AUTHORISATION,
        payload: authorisationState,
    })
}

export const loginUserTry = (dispatch, user) => async (dispatch) => {
    dispatch({type: LOGIN_TRY});
    return await loginUser(user)
        .then(({data}) => {
            const {sub} = jwt_decode(data.accessToken);
            return sub
        })
        .then(async (id) => await getContactById(id))
        .then(({data}) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data,
            })
        })
        .catch(e => {
            dispatch({
                type: LOGIN_FAIL,
                payload: get(e, ['response', 'data', 'error_message'], e.message)
            });
            return Promise.reject('Ошибка авторизации')
        });
};

export function leaveAccount(dispatch) {
    return dispatch({
        type: LEAVE_ACCOUNT,
    })
}