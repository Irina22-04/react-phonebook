import React from "react";
import {Input} from "semantic-ui-react";
import MaskedInput from "react-text-mask";

export const SelectInput = ({handler, touched, hasError, meta}) => {
    const variants = meta.variants.map((val, index) => (
        <option value={val.id} key={index}>{val.name}</option>
    ));
    const star = meta.obligated ? <span className={'star-span'}>&#10033;</span> : null;
    return (
        <div>
            <div className='field-header'>{star}{meta.title}</div>
            <select {...handler()}>
                <option value='' disabled>{`Выберите ${meta.label}`}</option>
                {variants}
            </select>
        </div>
    )
};

export const CheckboxInput = ({handler, touched, hasError, meta}) => {
    return (
        <div>
            <input type="checkbox" id="check" {...handler("checkbox")}/>
            <label className={'custom-checkbox'} htmlFor="check">{` ${meta.title}`}</label>
        </div>
    )
};

export const MaskInput = ({handler, touched, hasError, meta}) => {
    const star = meta.obligated ? <span className={'star-span'}>&#10033;</span> : null;
    return (
        <div className={'form-field'}>
            <div className='field-header'>{star}{meta.title}</div>

            <div className="ui left icon input">
                <MaskedInput
                    mask={meta.mask}
                    guide={true}
                    placeholder={`Введите ${meta.label}`}
                    {...handler()}/>
                <i aria-hidden="true" className={`${meta.icon} icon`}/>
            </div>

            {showError({touched, hasError})}
        </div>
    );
};

export const showError = ({touched, hasError}) => {
    if (hasError('pattern')) {
        return (<span className={'error-span'}>Некорректные данные. Допускаются только буквы и 2 пробела</span>)
    }
    if (touched && hasError('required')) {
        return (<span className={'error-span'}>Значение не может быть пустым</span>)
    }
};

export const TextInput = ({handler, touched, hasError, meta}) => {
    const star = meta.obligated ? <span className={'star-span'}>&#10033;</span> : null;
    return (
        <div className={'form-field'}>
            <div className='field-header'>{star}{meta.title}</div>
            <Input iconPosition='left' type={meta.type ? meta.type : 'text'}
                   icon={meta.icon ? meta.icon : null}
                   placeholder={`Введите ${meta.label}`} {...handler()}/>
            {showError({touched, hasError})}
        </div>
    );
};
