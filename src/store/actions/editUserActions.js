import {get} from "lodash";
import jwt_decode from "jwt-decode";

import {
    deleteContact,
    addContact,
    getAllContacts,
    editContact,
} from "../../utils/api";


export const USERS_LOADING = 'USERS_LOADING';
export const USERS_SET = 'USERS_SET';
export const USERS_ERROR = 'USERS_ERROR';

export const NEW_CONTACT_LOADING = 'NEW_CONTACT_LOADING';

export const DELETE_CONTACT_LOADING = 'DELETE_CONTACT_LOADING';
export const DELETE_CONTACT_SET = 'DELETE_CONTACT_SET';

export const EDIT_CONTACT_LOADING = 'EDIT_CONTACT_LOADING';
export const EDIT_CONTACT_SET = 'EDIT_CONTACT_SET';

export const NEW_CONTACT_EDIT = 'NEW_CONTACT_EDIT';

export const EDIT_CONTACTS_SET_PAGE = 'EDIT_CONTACTS_SET_PAGE';
export const EDIT_CONTACTS_SET_SEARCH_PATTERN = 'EDIT_CONTACTS_SET_SEARCH_PATTERN';
export const RESET_EDIT_CONTACT_SEARCH = 'RESET_EDIT_CONTACT_SEARCH';

export const CONTACT_ERROR = 'NEW_CONTACT_ERROR';

export function getAllUsersTry(dispatch) {
    return async function () {
        dispatch({type: USERS_LOADING});
        await getAllContacts()
            .then(data => {
                dispatch({
                    type: USERS_SET,
                    payload: data.data,
                })
            })
            .catch(e => {
                dispatch({
                    type: USERS_ERROR,
                    payload: get(e, ['response', 'data', 'error_message'], e.message)
                });
            });
    }
}

export function addNewContactTry(dispatch, contact) {
    return async function () {
        dispatch({type: NEW_CONTACT_LOADING});
        await addContact(contact)
            .then((data) => {
                const {sub} = jwt_decode(data.data.accessToken);
                return sub;
            })
            .then((data) => {
                dispatch({
                    type: NEW_CONTACT_EDIT,
                    payload: data,
                })
            })
            .catch(e => {
                dispatch({
                    type: CONTACT_ERROR,
                    payload: get(e, ['response', 'data', 'error_message'], e.message)
                });
                return Promise.reject(e.message);
            });
    }
}

export function deleteContactTry(dispatch, contactId) {
    return async function () {
        dispatch({type: DELETE_CONTACT_LOADING});
        await deleteContact(contactId)
            .then(() => {
                dispatch({
                    type: DELETE_CONTACT_SET,
                    payload: contactId,
                })
            })
            .catch(e => {
                dispatch({
                    type: CONTACT_ERROR,
                    payload: get(e, ['response', 'data', 'error_message'], e.message)
                });
                return Promise.reject(e.message);
            });
    }
}

export function editContactTry(dispatch, contact) {
    return async function () {
        dispatch({type: EDIT_CONTACT_LOADING});
        const {password, ...withoutPassword} = contact;
        const editedContact = password ? contact : withoutPassword;
        return await editContact(editedContact)
            .then(() => {
                dispatch({
                    type: EDIT_CONTACT_SET,
                    payload: contact,
                });
            })
            .catch(e => {
                dispatch({
                    type: CONTACT_ERROR,
                    payload: get(e, ['response', 'data', 'error_message'], e.message)
                });
                return Promise.reject(e.message);
            });
    };
}

export function setPage(dispatch, page){
    return dispatch({type: EDIT_CONTACTS_SET_PAGE, payload: page});
}

export function setSearchPattern(dispatch, pattern){
    return dispatch({type: EDIT_CONTACTS_SET_SEARCH_PATTERN, payload: pattern});
}

export function resetSearchParams(dispatch) {
    return dispatch({type: RESET_EDIT_CONTACT_SEARCH});
}

