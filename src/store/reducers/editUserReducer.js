import {
    CONTACT_ERROR,
    NEW_CONTACT_LOADING,
    USERS_ERROR,
    USERS_LOADING,
    USERS_SET,
    DELETE_CONTACT_LOADING,
    DELETE_CONTACT_SET,
    EDIT_CONTACT_LOADING,
    EDIT_CONTACT_SET,
    NEW_CONTACT_EDIT,
    EDIT_CONTACTS_SET_PAGE,
    EDIT_CONTACTS_SET_SEARCH_PATTERN,
    RESET_EDIT_CONTACT_SEARCH
} from "../actions/editUserActions";

const initialState = {
    status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
    usersList: [],
    error: '',
    updateStatus: 0,
    addedContact: '',
    paginationOptions: {
        page: 1,
        limit: 15
    },
    searchOptions: ''
};

const usersListForEdit = (state = initialState, {type, payload}) => {
    switch (type) {
        case USERS_LOADING: {
            return {
                ...state,
                status: 1,
                usersList: [],
                error: ''
            }
        }
        case USERS_SET: {
            return {
                ...state,
                status: 3,
                usersList: payload,
                error: ''
            }
        }
        case USERS_ERROR: {
            return {
                ...state,
                status: 2,
                usersList: [],
                error: payload
            }
        }
        case NEW_CONTACT_LOADING: {
            return {
                ...state,
                updateStatus: 1,
                error: ''
            }
        }
        case NEW_CONTACT_EDIT: {
            return {
                ...state,
                updateStatus: 3,
                addedContact: payload,
            }
        }
        case CONTACT_ERROR: {
            return {
                ...state,
                updateStatus: 2,
                error: payload
            }
        }
        case DELETE_CONTACT_LOADING: {
            return {
                ...state,
                updateStatus: 1,
            }
        }
        case DELETE_CONTACT_SET: {
            console.log(payload)
            return {
                ...state,
                updateStatus: 3,
                usersList: state.usersList.filter(contact => contact.id !== Number(payload))
            }
        }
        case EDIT_CONTACT_LOADING: {
            return {
                ...state,
                updateStatus: 1,
            }
        }
        case EDIT_CONTACT_SET: {
            return {
                ...state,
                updateStatus: 3,
                usersList: state.usersList.map(contact => contact = contact.id !== Number(payload.id) ? contact : payload)
            }
        }
        case EDIT_CONTACTS_SET_PAGE: {
            return {
                ...state,
                paginationOptions: {
                    ...state.paginationOptions,
                    page: payload
                }
            }
        }
        case EDIT_CONTACTS_SET_SEARCH_PATTERN: {
            return {
                ...state,
                searchOptions: payload,
                paginationOptions: {
                    ...state.paginationOptions,
                    page: 1,
                },
            }
        }
        case RESET_EDIT_CONTACT_SEARCH: {
            return {
                ...state,
                searchOptions: '',
                paginationOptions: {
                    ...state.paginationOptions,
                    page: 1,
                },
            }
        }
        default:
            return state;
    }
};

export default usersListForEdit;