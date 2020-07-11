import { createSelector } from "reselect";
import {sortBy} from "lodash";

const getPaginationOptions = (state) => state.contactsForSearch.paginationOptions;
const getSearchOptions = (state) => state.contactsForSearch.searchOptions;
const getContacts = (state) => state.contactsForSearch;

export const getVisibleContacts = createSelector(
    [ getPaginationOptions, getSearchOptions, getContacts ],
    ({page, limit}, searchOptions, contacts) => {

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const contactList =  sortBy(contacts.contacts, ['surname', 'name', 'patronym'])
            .filter(contact => filterContacts(contact, searchOptions));
        return {
            ...contacts,
            contacts: contactList.slice(startIndex, endIndex),
            totalElements: contactList.length
        }
    }
);

const filterContacts = (contact, searchOptions) => {
    const {surnameLetter, fullNamePattern} = searchOptions;
    if(surnameLetter){
        const surnameRegexp = new RegExp(`^${surnameLetter}`, 'i');
        return surnameRegexp.test(contact.surname);
    }
    if(fullNamePattern){
        const patternsParts = fullNamePattern
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