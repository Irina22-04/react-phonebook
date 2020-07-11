import {get} from "lodash";

import {getAllContacts} from "../../utils/api";

export const CONTACTS_LOADING = 'CONTACTS_LOADING';
export const CONTACTS_SET = 'CONTACTS_SET';
export const CONTACTS_ERROR = 'CONTACTS_ERROR';
export const CONTACTS_SET_PAGE = 'CONTACTS_SET_PAGE';
export const CONTACTS_SET_SURNAME_LETTER = 'CONTACTS_SET_SURNAME_LETTER';
export const CONTACTS_SET_FULLNAME_PATTERN = 'CONTACTS_SET_FULLNAME_PATTERN';
export const RESET_CONTACT_SEARCH = 'RESET_CONTACT_SEARCH';


export function getAllContactsTry(dispatch) {
    return async function () {
        dispatch({type: CONTACTS_LOADING});
        await getAllContacts()
            .then(data => {
                dispatch({
                    type: CONTACTS_SET,
                    payload: data.data,
                })
            })
            .catch(e => {
                dispatch({
                    type: CONTACTS_ERROR,
                    payload: get(e, ['response', 'data', 'error_message'], e.message)
                });
            });
    }
}

export function setPage(dispatch, page) {
    return dispatch({type: CONTACTS_SET_PAGE, payload: page});
}

export function setSurnameLetter(dispatch, letter) {
    return dispatch({type: CONTACTS_SET_SURNAME_LETTER, payload: letter});
}

export function setFullnamePattern(dispatch, pattern) {
    return dispatch({type: CONTACTS_SET_FULLNAME_PATTERN, payload: pattern});
}

export function resetSearchParams(dispatch) {
    return dispatch({type: RESET_CONTACT_SEARCH});
}
