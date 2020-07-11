import {
    CONTACTS_ERROR,
    CONTACTS_LOADING,
    CONTACTS_SET,
    CONTACTS_SET_FULLNAME_PATTERN,
    CONTACTS_SET_PAGE,
    CONTACTS_SET_SURNAME_LETTER,
    RESET_CONTACT_SEARCH
} from "../actions/contactsActions";

const initialState = {
    status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
    contacts: [],
    error: '',
    paginationOptions: {
        page: 1,
        limit: 15
    },
    searchOptions: {
        surnameLetter: '',
        fullNamePattern: ''
    }
};

const contactsForSearch = (state = initialState, {type, payload}) => {
    switch (type) {
        case CONTACTS_LOADING: {
            return {
                ...state,
                status: 1,
                contacts: [],
                error: ''
            }
        }
        case CONTACTS_SET: {
            return {
                ...state,
                status: 3,
                contacts: payload,
                error: ''
            }
        }
        case CONTACTS_ERROR: {
            return {
                ...state,
                status: 2,
                contacts: [],
                error: payload
            }
        }
        case CONTACTS_SET_PAGE: {
            return {
                ...state,
                paginationOptions: {
                    ...state.paginationOptions,
                    page: payload
                }
            }
        }
        case CONTACTS_SET_SURNAME_LETTER: {
            return {
                ...state,
                searchOptions: {
                    surnameLetter: payload,
                    fullNamePattern: ''
                },
                paginationOptions: {
                    ...state.paginationOptions,
                    page: 1,
                },
            }
        }
        case CONTACTS_SET_FULLNAME_PATTERN: {
            return {
                ...state,
                searchOptions: {
                    surnameLetter: '',
                    fullNamePattern: payload
                },
                paginationOptions: {
                    ...state.paginationOptions,
                    page: 1,
                },
            }
        }
        case RESET_CONTACT_SEARCH: {
            return {
                ...state,
                searchOptions: {
                    surnameLetter: '',
                    fullNamePattern: ''
                },
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

export default contactsForSearch;
