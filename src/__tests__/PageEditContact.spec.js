import React from "react";
import renderer, {act} from "react-test-renderer";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {BrowserRouter} from "react-router-dom";

import {mockUsers} from "../__mocks__/mockUsers";
import PageEditContact from "../containers/PageEditContacts/PageEditContacts";
import {USERS_LOADING} from "../store/actions/editUserActions";


const initialState = {
    status: 3,
    usersList: mockUsers,
    error: '',
    updateStatus: 0,
    addedContact: '',
    paginationOptions: {
        page: 1,
        limit: 15
    },
    searchOptions: ''
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('PageEditContact', () => {
    const state = {usersListForEdit: initialState};
    const store = mockStore(() => state);
    const component = renderer.create(<Provider store={store}><BrowserRouter>
        <PageEditContact location={{search: null}} history={[]}/></BrowserRouter></Provider>);

    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

    it('dispatch USERS_LOADING after render', () => {
        expect(store.getActions()).toEqual([{type: USERS_LOADING}]);
    });

    it('button edit user should work', () => {

        const buttons = component.root.findAllByType('button');
        buttons[4].props.onClick();

        let componentTree = component.toJSON();
        expect(componentTree).toMatchSnapshot();
    });

    it('button add user should work', () => {

        const button = component.root.findByProps({className: "all-users-button edit-user-page-button"});
        button.props.onClick();

        let componentTree = component.toJSON();
        expect(componentTree).toMatchSnapshot();
    });

});

