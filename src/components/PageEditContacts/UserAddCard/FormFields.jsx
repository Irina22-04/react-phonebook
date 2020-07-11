import React from "react";
import {Input} from "semantic-ui-react";
import MaskedInput from "react-text-mask";

export const SelectInput = ({handler, touched, hasError, meta}) => {
    const variants = meta.variants.map((val, index) => (
        <option value={val.id} key={index}>{val.name}</option>
    ));
    return (
        <div>
            <div className='field-header'>{meta.title}</div>
            <select {...handler()}>
                <option value='' disabled>{`Выберите ${meta.label}`}</option>
                {variants}
            </select>
        </div>
    )
};

export const MaskInput = ({handler, touched, hasError, meta}) => (
    <div className={'form-field'}>
        <div className='field-header'>{meta.title}</div>

        <div className="ui left icon input">
            <MaskedInput
                mask={[/\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
                guide={true}
                placeholder={`Введите ${meta.label}`}
                {...handler()}/>
            <i aria-hidden="true" className="phone icon"/>
        </div>
        {showMaskError({touched, hasError, meta})}
    </div>
);

const showError = ({touched, hasError, meta}) => {
    if (touched && hasError('pattern') && meta.type === 'email') {
        return (<span className={'error-span'}>Введите корректный email</span>)
    } else if (hasError('pattern') && !meta.type) {
        return (<span className={'error-span'}>Некорректные данные. Допускаются только буквы и 2 пробела</span>)
    } else if (touched && hasError('required')) {
        return (<span className={'error-span'}>Значение не может быть пустым</span>)
    }
};

const showMaskError = ({touched, hasError, meta}) => {
    if (touched && hasError('pattern') && meta.type === 'phone') {
        return (<span className={'error-span'}>Введите корректный номер телефона</span>)
    } else if (touched && hasError('required')) {
        return (<span className={'error-span'}>Значение не может быть пустым</span>)
    }
};

export const TextInput = ({handler, touched, hasError, meta}) => (
    <div className={'form-field'}>
        <div className='field-header'>{meta.title}</div>
        <Input iconPosition='left' type={meta.type ? meta.type : 'text'}
               icon={meta.icon ? meta.icon : null}
               placeholder={`Введите ${meta.label}`} {...handler()}/>
        {showError({touched, hasError, meta})}
    </div>
);
