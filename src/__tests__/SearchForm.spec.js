import React from "react";
import renderer, {act} from "react-test-renderer";

import SearchForm from "../components/PageSearch/SearchForm/SearchForm";

const spy = jest.fn();


describe('SearchForm', () => {

    const component = renderer.create(<SearchForm fullNamePattern={''} initialValue={''} cbHandleSubmit={spy}/>);

    it('onSubmit should work', () => {
        const inputElem = component.root.findByType('input');
        const formElem = component.root.findByType('form');
        inputElem.props.onChange('abc');
        formElem.props.onSubmit({preventDefault: () => null});

        expect(spy).toHaveBeenCalledWith('abc');
    });

    it('input correct word shouldn`t make form invalid', () => {
        const inputElem = component.root.findByType('input');
        inputElem.props.onChange('abc');

        expect(component.getInstance().searchForm.status).toEqual('VALID');
    });

    it('input number should make form invalid', () => {
        const inputElem = component.root.findByType('input');
        inputElem.props.onChange('123');

        expect(component.getInstance().searchForm.status).toEqual('INVALID');
    });

    it('input  more than 3 words make form invalid', () => {
        const inputElem = component.root.findByType('input');
        inputElem.props.onChange('qwe qwe qwe qwe');

        expect(component.getInstance().searchForm.status).toEqual('INVALID');
    })

});