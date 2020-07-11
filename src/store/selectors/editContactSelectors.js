import {createSelector} from "reselect";
import {sortBy} from "lodash";

const getPaginationOptions = (state) => state.usersListForEdit.paginationOptions;
const getSearchOptions = (state) => state.usersListForEdit.searchOptions;
const getContacts = (state) => state.usersListForEdit;

export const getVisibleContacts = createSelector(
    [ getPaginationOptions, getSearchOptions, getContacts ],
    ({page, limit}, searchOptions, usersList) => {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const contactList =  sortBy(usersList.usersList, ['surname', 'name', 'patronym'])
            .filter(contact => filterContacts(contact, searchOptions));
        return {
            ...usersList,
            usersList: contactList.slice(startIndex, endIndex),
            totalElements: contactList.length,
        }
    }
);

const filterContacts = (contact, searchOptions) => {

    if(searchOptions){

        const patternsParts = searchOptions
            .replace(/\s{2,}/, ' ')
            .split(' ');
        const fullNameRegexps = patternsParts
            .map((patternsPart) => new RegExp(`[A-zА-яЁё ]*(${patternsPart})[A-zА-яЁё ]*`, 'i'));
        const {name, surname, patronym} = contact;
        const fullname = [name, surname, patronym]
            .filter(Boolean)
            .join(' ');
        return fullNameRegexps.every((pattern) => pattern.test(fullname));
    }
    return true;
};