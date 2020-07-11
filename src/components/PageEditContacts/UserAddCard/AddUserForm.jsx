import React from "react";
import {FieldControl, FieldGroup, FormBuilder, Validators} from "react-reactive-form";
import PropTypes from "prop-types";
import {Button} from "semantic-ui-react";
import {isEqual} from "lodash";

import {MaskInput, SelectInput, TextInput} from "./FormFields";

export default class AddUserForm extends React.PureComponent {

    static propTypes = {
        cbSwitchIsChanging: PropTypes.func.isRequired,
        cbHandleReset: PropTypes.func.isRequired,
        cbHandleSubmit: PropTypes.func.isRequired,
        variants: PropTypes.arrayOf(PropTypes.object).isRequired,
    };

    constructor() {
        super();
        this.state = {
            initialValue: '',
        };
        this.addUserForm = FormBuilder.group({
            surname: ["", [Validators.pattern(/^([A-Za-zА-яа-яЁё]*\s){0,2}[A-Za-zА-яа-яЁё]*$/), Validators.required]],
            name: ["", [Validators.pattern(/^([A-Za-zА-яа-яЁё]*\s){0,2}[A-Za-zА-яа-яЁё]*$/), Validators.required]],
            patronym: ["", [Validators.pattern(/^([A-Za-zА-яа-яЁё]*\s){0,2}[A-Za-zА-яа-яЁё]*$/), Validators.required]],
            email: ["", [Validators.pattern(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/),
                Validators.required]],
            password: ["", [Validators.required]],
            department: ["", [Validators.required]],
            position: ["", [Validators.pattern(/^([A-Za-zА-яа-яЁё]*\s){0,2}[A-Za-zА-яа-яЁё]*$/), Validators.required]],
            phone: ["", [Validators.required, Validators.pattern(/\d{3}-\d{2}-\d{2}/)]],
        });
    }

    componentDidMount() {
        this.setState({initialValue: this.addUserForm.value});
    }

    checkChanges = () => {
        let isChanging = !isEqual(this.addUserForm.value, this.state.initialValue);
        if (isChanging) {
            this.props.cbSwitchIsChanging(isChanging);
            return this.setState({isChanging: isChanging});
        }
        return this.handleReset();
    };

    handleReset = () => {
        this.addUserForm.reset();
        this.props.cbHandleReset();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.cbHandleSubmit(this.addUserForm.value);
    };

    render() {
        return (
            <div className={'edit-card'}>
                <FieldGroup
                    control={this.addUserForm}
                    render={({get, invalid}) => (
                        <form onSubmit={this.handleSubmit}>

                            <div className={'form-row'}>
                                <FieldControl
                                    name="surname"
                                    render={TextInput}
                                    meta={{label: "Фамилию", title: 'Фамилия:', icon: 'keyboard outline'}}
                                />

                                <FieldControl
                                    name="name"
                                    render={TextInput}
                                    meta={{label: "Имя", title: 'Имя:', icon: 'keyboard outline'}}
                                />

                                <FieldControl
                                    name="patronym"
                                    render={TextInput}
                                    meta={{label: "Отчество", title: 'Отчество:', icon: 'keyboard outline'}}
                                />
                            </div>


                            <div className={'form-row'}>
                                <FieldControl
                                    name="email"
                                    render={TextInput}
                                    meta={{
                                        label: "email",
                                        title: 'Email:',
                                        icon: 'envelope',
                                        type: 'email'
                                    }}
                                />

                                <FieldControl
                                    name="password"
                                    render={TextInput}
                                    meta={{
                                        label: "пароль",
                                        title: 'Пароль:',
                                        icon: 'eye slash',
                                        type: 'password'
                                    }}
                                />
                            </div>

                            <div className={'form-row'}>
                                <FieldControl
                                    name="position"
                                    render={TextInput}
                                    meta={{label: "должность", title: 'Должность:', icon: 'id badge'}}
                                />

                                <FieldControl
                                    name="phone"
                                    render={MaskInput}
                                    meta={{
                                        label: "телефон",
                                        title: 'Телефон:',
                                        icon: 'phone',
                                        type: 'phone'
                                    }}
                                />
                            </div>

                            <FieldControl
                                name="department"
                                render={SelectInput}
                                meta={{label: "подразделение", variants: this.props.variants, title: 'Подразделение:'}}
                            />

                            <Button.Group className={'add-user-button'}>
                                <Button
                                    type="button"
                                    onClick={this.checkChanges}
                                >Отмена</Button>
                                <Button.Or text=''/>
                                <Button
                                    type="submit"
                                    disabled={invalid}
                                    positive>Сохранить</Button>
                            </Button.Group>

                        </form>
                    )}
                />
            </div>
        )
    }
}