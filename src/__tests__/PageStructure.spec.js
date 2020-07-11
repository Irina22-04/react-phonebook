import React from "react";
import renderer, {act} from 'react-test-renderer';
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store'
import {Provider} from "react-redux";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {getStructureTry, STRUCTURE_LOADING, STRUCTURE_SET} from "../store/actions/departmentActions";
import PageStructure from "../containers/PageStructure/PageStructure";
import {mockStructure} from "../__mocks__/mockStructure";
import {BASE_URL} from "../config";

const initialState = {
    department: '',
    structure: [],
    status: 0,
    error: '',
    editDepartment: '',
    parentDepartment: '',
    carriedDepartment: '',
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('PageStructure', () => {
    const state = {department: initialState};
    const store = mockStore(() => state);
    const root = renderer.create(<Provider store={store}><PageStructure/></Provider>).root;

    it('dispatch STRUCTURE_LOADING after render', () => {
        expect(store.getActions()).toEqual([{type: STRUCTURE_LOADING}]);
    });

    it('getStructureTry dispatch STRUCTURE_SET', () => {
        const mock = new MockAdapter(axios);
        const url = `${BASE_URL}/structure`;

        mock.onGet(url).reply(200, mockStructure);

        const expectedActions = [
            {type: STRUCTURE_LOADING},
            {type: STRUCTURE_LOADING},
            {type: STRUCTURE_SET, payload: mockStructure}
        ];

        store.dispatch(getStructureTry(store.dispatch)).then(() => {
            expect(expect(store.getActions()).toEqual(expectedActions))
        })
    })
});
