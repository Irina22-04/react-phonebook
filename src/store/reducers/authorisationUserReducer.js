import {
    LEAVE_ACCOUNT,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_TRY,
    USER_AUTHORISATION
} from "../actions/authorisationUserActions";

const initialState = {
    status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
    isAuthorisation: false,
    userId: '',
    userEmail: '',
    error: '',
    isAdmin: false,
};

const userForAuthorisation = (state = initialState, {type, payload}) => {
    switch (type) {
        case USER_AUTHORISATION: {
            return {
                ...state,
                isAuthorisation: payload,
            }
        }
        case LOGIN_TRY: {
            return {
                ...state,
                status: 1,
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                status: 3,
                userId: payload.id,
                userEmail: payload.email,
                isAdmin: payload.isAdmin,
                isAuthorisation: false,
            }
        }
        case LOGIN_FAIL: {
            return {
                ...state,
                status: 2,
                userId: '',
                userEmail: '',
                error: payload,
            }
        }
        case LEAVE_ACCOUNT: {
            return {
                ...state,
                status: 0,
                userId: '',
                userEmail: '',
                isAuthorisation: false,
                isAdmin: false,
            }
        }

        default:
            return state;
    }
};

export default userForAuthorisation;
