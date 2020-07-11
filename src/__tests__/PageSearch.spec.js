import React from "react";
import renderer, {act} from "react-test-renderer";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import PageSearch from "../containers/PageSearch/PageSearch";
import {CONTACTS_LOADING, CONTACTS_SET, getAllContactsTry} from "../store/actions/contactsActions";
import {mockUsers} from "../__mocks__/mockUsers";
import {BASE_URL} from "../config";

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


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('PageSearch', () => {
    const state = {contactsForSearch: initialState};
    const store = mockStore(() => state);
    const component = renderer.create(<Provider store={store}><PageSearch location={{search: null}}
                                                                          history={[]}/></Provider>);

    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

    it('dispatch CONTACTS_LOADING after render', () => {
        expect(store.getActions()).toEqual([{type: CONTACTS_LOADING}]);
    });

    it('getAllContactsTry dispatch CONTACTS_SET', () => {
        const mock = new MockAdapter(axios);
        const url = `${BASE_URL}/users?_sort=surname`;

        mock.onGet(url).reply(200, mockUsers);

        const expectedActions = [
            {type: CONTACTS_LOADING},
            {type: CONTACTS_LOADING},
            {type: CONTACTS_SET, payload: mockUsers}
        ];

        store.dispatch(getAllContactsTry(store.dispatch)).then(() => {
            expect(expect(store.getActions()).toEqual(expectedActions))
        });

    });

    it('button letter should work', () => {

        const buttons = component.root.findAllByProps({className: 'ui mini button'});
        buttons[4].props.onClick({target: {textContent: "A"}});

        let componentTree = component.toJSON();
        expect(componentTree).toMatchSnapshot();
    });

    it('button all should work', () => {

        const button = component.root.findByProps({className: 'all-users-button'});
        button.props.onClick();

        let componentTree = component.toJSON();
        expect(componentTree).toMatchSnapshot();
    });

});



