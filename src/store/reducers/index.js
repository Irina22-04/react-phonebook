import { combineReducers } from "redux";

import contactsForSearch from "./contactsReducers";
import employeesListForDepartment from "./employeesListReducer";
import department from "./departmentReducer";
import usersListForEdit from "./editUserReducer";
import userForAuthorisation from "./authorisationUserReducer";

let combinedReducer=combineReducers({
    contactsForSearch: contactsForSearch,
    employeesListForDepartment: employeesListForDepartment,
    department: department,
    usersListForEdit: usersListForEdit,
    userForAuthorisation: userForAuthorisation,
});

export default combinedReducer;