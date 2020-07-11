import React from "react";
import PropTypes from "prop-types";
import {FieldControl, FieldGroup, FormBuilder, Validators} from "react-reactive-form";
import {Button, Input} from "semantic-ui-react";
import {isEqual} from "lodash";

export const TextInput = ({handler, touched, hasError, meta}) => (
    <div>
        <div className={'search-name'}>Поиск контакта</div>
        <Input className={'search-input'} icon='users' iconPosition='left' fluid maxLength='40'
               placeholder={`Введите ${meta.label}`} {...handler()}/>
        {showError({touched, hasError})}
    </div>
);

const showError = ({touched, hasError}) => {
    if (hasError('pattern')) {
        return (<span className={'error-span'}>Некорректные данные. Допускаются только буквы и 2 пробела</span>)
    }
};

export default class SearchForm extends React.PureComponent {

    static propTypes = {
        fullNamePattern: PropTypes.string.isRequired,
        cbHandleSubmit: PropTypes.func.isRequired,
        surnameLetter: PropTypes.string,
        initialValue: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.searchForm = FormBuilder.group({
            username: [this.props.fullNamePattern,
                [Validators.pattern(/^([A-Za-zА-яа-яЁё]*\s){0,2}[A-Za-zА-яа-яЁё]*$/)]],
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        return this.props.cbHandleSubmit(this.searchForm.value.username);
    };

    componentDidUpdate(prevProps) {
        if ((prevProps.fullNamePattern !== this.props.fullNamePattern) && this.props.surnameLetter) {
            this.searchForm.patchValue({'username': ''});
        }
    };

    handleReset = () => {
        this.searchForm.reset();
        this.searchForm.patchValue({'username': ''});
    };

    checkChanges = () => {
        return isEqual(this.searchForm.value.username, this.props.initialValue);
    };

    checkEmptyString = () => {
        return this.searchForm.value.username === '';
    };

    render() {
        return (
            <div className={'search-field'}>
                <FieldGroup
                    control={this.searchForm}
                    render={({get, invalid}) => (
                        <form onSubmit={this.handleSubmit}>

                            <FieldControl
                                name="username"
                                render={TextInput}
                                meta={{label: "имя"}}
                            />

                            <Button.Group className={'search-contacts-buttons'}>
                                <Button
                                    type="button"
                                    onClick={this.handleReset}
                                    disabled={this.checkEmptyString()}
                                >Очистить</Button>
                                <Button.Or text=''/>
                                <Button
                                    type="submit"
                                    disabled={invalid || this.checkChanges()}
                                    positive>Искать</Button>
                            </Button.Group>

                        </form>
                    )}
                />
            </div>
        );
    }
}