import React from "react";
import renderer, {act} from "react-test-renderer";
import {Provider} from "react-redux";
import {mockStructure} from "../__mocks__/mockStructure";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";


import Folder from "../components/PageStructure/Folder/Folder";
import {EMPLOYEES_LOADING} from "../store/actions/employeesListActions";


const initialState = {
    department: {
        department: '',
        structure: mockStructure,
        status: 3,
        error: '',
        editDepartment: '',
        parentDepartment: '',
        carriedDepartment: '',
    },
    employeesListForDepartment: {
        status: 0,
        employeesList: [],
        error: '',
    }
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('PageStructure', () => {
    const state = {...initialState};
    const store = mockStore(() => state);
    const component = renderer.create(<Provider store={store}><Folder folderId={4}/></Provider>);

    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();

    it('onClick should work', () => {
        const folder = component.root.findByProps({id: 4});
        folder.props.onClick({currentTarget: {getAttribute: () => 4}});

        const expectedActions = [
            {type: EMPLOYEES_LOADING},
            {type: "SET_DEPARTMENT", payload: 4},
            {type: "SET_DEPARTMENT", payload: 4}
        ];

        expect(store.getActions()).toEqual(expectedActions);

        let componentTree = component.toJSON();
        expect(componentTree).toMatchSnapshot();
    });

});