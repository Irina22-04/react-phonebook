import React from "react";
import renderer, {act} from "react-test-renderer";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";

import PageContainer from "../components/PageSearch/SearchContainer/SearchContainer";

const initialState = {
    status: 0,
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

const spy = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('PageSearch', () => {
    const state = {contactsForSearch: initialState};
    const store = mockStore(() => state);
    const component = renderer.create(<Provider store={store}><PageContainer clickedLetter={''}
                                                                             cbClickLetter={spy}/></Provider>);

    it('handleClick should work', () => {
        const buttonElems = component.root.findAllByType('button');
        buttonElems[0].props.onClick({target: {textContent: "A"}});
        expect(spy).toHaveBeenCalledWith("a");
    })

});
