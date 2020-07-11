import React from "react";
import PropTypes from "prop-types";
import {Button} from "semantic-ui-react";
import {FieldControl, FieldGroup, FormBuilder, Validators} from "react-reactive-form";
import {isEqual} from "lodash";

import {CheckboxInput, MaskInput, SelectInput, TextInput} from "./FormFields";

export default class EditUserForm extends React.PureComponent {

    static propTypes = {
        user: PropTypes.object.isRequired,
        cbSetIsChanging: PropTypes.func.isRequired,
        cbHandleSubmit: PropTypes.func.isRequired,
        variants: PropTypes.arrayOf(PropTypes.object).isRequired,
        cbHandleReset: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isChanging: false,
            initialValue: '',
            isRenderForm: false,
        };
        this.searchForm = FormBuilder.group({
            surname: [this.props.user.surname || '', [Validators.required]],
            name: [this.props.user.name || '', [Validators.required]],
            patronym: [this.props.user.patronym || '', [Validators.required]],
            department: [this.props.user.department || '', [Validators.required]],
            email: [this.props.user.email || '', [Validators.required, Validators.pattern(/\w+@\w+\.\w/)]],
            password: [''],
            position: [this.props.user.position, [Validators.required]],
            phone: [this.props.user.phone || '', [Validators.required, Validators.pattern(/\d{3}-\d{2}-\d{2}/)]],
            businessMobile: [this.props.user.businessMobile || '', [Validators.pattern(/\(\d{2}\)\d{3}-\d{2}-\d{2}/)]],
            personalMobile: [this.props.user.personalMobile || '', [Validators.pattern(/\(\d{2}\)\d{3}-\d{2}-\d{2}/)]],
            personalEmail: [this.props.user.personalEmail || '', [Validators.pattern(/\w+@\w+\.\w/)]],
            birthday: [this.props.user.birthday || '', [Validators.pattern(/\d{2}\/\d{2}\/\d{4}/)]],
            isAdmin: [this.props.user.isAdmin || false]
        });
    }

    componentDidMount() {
        this.searchForm.valueChanges.subscribe(val => {
            let isChanging = !isEqual(val, this.state.initialValue);
            this.setState({isChanging: isChanging});
            this.props.cbSetIsChanging(isChanging);
        });

        this.setState({initialValue: this.searchForm.value, isRenderForm: true});
    }

    componentWillUnmount() {
        this.searchForm.valueChanges.unsubscribe();
    };

    hasChanges = () => {
        return isEqual(this.searchForm.value, this.state.initialValue);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.cbHandleSubmit(this.searchForm.value);
    };

    render() {
        return this.state.isRenderForm ? (<div className={'edit-card'}>
            <FieldGroup
                control={this.searchForm}
                render={({get, invalid}) => (
                    <form onSubmit={this.handleSubmit}>

                        <div className={'form-row'}>
                            <FieldControl
                                name="surname"
                                render={TextInput}
                                meta={{label: "фамилию", title: 'Фамилия:', icon: 'keyboard outline', obligated: true}}
                            />

                            <FieldControl
                                name="name"
                                render={TextInput}
                                meta={{label: "имя", title: 'Имя:', icon: 'keyboard outline', obligated: true}}
                            />

                            <FieldControl
                                name="patronym"
                                render={TextInput}
                                meta={{
                                    label: "отчество",
                                    title: 'Отчество:',
                                    icon: 'keyboard outline',
                                    obligated: true
                                }}
                            />
                        </div>

                        <div className={'form-row'}>
                            <FieldControl
                                name="email"
                                render={TextInput}
                                type={'email'}
                                meta={{label: "email", title: 'Email:', icon: 'envelope', obligated: true}}
                            />

                            <FieldControl
                                name="password"
                                render={TextInput}
                                meta={{
                                    label: "пароль",
                                    title: 'Пароль:',
                                    icon: 'eye slash',
                                    type: 'text',
                                }}
                            />
                        </div>

                        <FieldControl
                            name="department"
                            render={SelectInput}
                            meta={{
                                label: "подразделение",
                                variants: this.props.variants,
                                title: 'Подразделение:',
                                obligated: true
                            }}
                        />

                        <div className={'form-row'}>
                            <FieldControl
                                name="position"
                                render={TextInput}
                                meta={{label: "должность", title: 'Должность:', icon: 'id badge', obligated: true}}
                            />

                            <FieldControl
                                name="phone"
                                render={MaskInput}
                                meta={{
                                    label: "телефон",
                                    title: 'Телефон:',
                                    icon: 'phone',
                                    mask: [/\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/],
                                    obligated: true
                                }}
                            />
                        </div>

                        <div className={'form-row'}>
                            <FieldControl
                                name="businessMobile"
                                render={MaskInput}
                                meta={{
                                    label: "телефон",
                                    title: 'Служебный моб. телефон:',
                                    icon: 'mobile alternate',
                                    mask: ["(", /\d/, /\d/, ")", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]
                                }}
                            />

                            <FieldControl
                                name="personalMobile"
                                render={MaskInput}
                                meta={{
                                    label: "телефон",
                                    title: 'Личный моб. телефон:',
                                    icon: 'mobile alternate',
                                    mask: ["(", /\d/, /\d/, ")", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]
                                }}
                            />
                        </div>

                        <div className={'form-row'}>
                            <FieldControl
                                name="personalEmail"
                                render={TextInput}
                                type={'email'}
                                meta={{label: "email", title: 'Личный email:', icon: 'envelope'}}
                            />
                        </div>

                        <div className={'form-row'}>
                            <FieldControl
                                name="birthday"
                                render={MaskInput}
                                meta={{
                                    label: "дату рождения",
                                    title: 'Дата рождения:',
                                    icon: 'calendar alternate outline',
                                    mask: [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                                }}
                            />
                        </div>

                        <div className={'form-row checkbox-input'}>
                            <FieldControl
                                name="isAdmin"
                                render={CheckboxInput}
                                meta={{
                                    title: 'Администратор',
                                }}
                            />
                        </div>
                        <Button.Group className={'add-user-button'}>
                            <Button
                                type="button"
                                onClick={this.props.cbHandleReset}
                            >Отмена</Button>
                            <Button.Or text=''/>
                            <Button
                                type="submit"
                                disabled={invalid || this.hasChanges()}
                                positive>Сохранить</Button>
                        </Button.Group>

                    </form>
                )}
            />
        </div>) : null;
    }
}