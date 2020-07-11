import React from "react";
import {FieldControl, FieldGroup, FormBuilder, Validators,} from "react-reactive-form";
import {connect} from "react-redux";
import {Button, Input} from "semantic-ui-react";
import PropTypes from "prop-types";

import {loginUserTry, setUserAuthorisation} from "../../store/actions/authorisationUserActions";
import "./AuthorisationForm.css";

const TextInput = ({handler, touched, hasError, meta}) => (
    <div className={'field-wrapper'}>
        <Input icon={meta.icon} iconPosition='left' fluid maxLength='40'
               type={meta.type}
               placeholder={`Введите ${meta.label}`} {...handler()}/>
        <span>
        {touched
        && hasError("required")
        && 'Поле обязательно для ввода'}
    </span>
    </div>
);

class AuthorisationForm extends React.PureComponent {

    static propTypes = {
        userForAuthorisation: PropTypes.object.isRequired,
    };

    constructor() {
        super();
        this.state = {
            editable: false,
            errorAuthorisation: false
        };
    }

    componentDidMount() {
        this.loginForm = FormBuilder.group({
            email: [localStorage.getItem('user'), Validators.required],
            password: [localStorage.getItem('password'), Validators.required],
        });
        this.setState({editable: true});
    }

    handleReset = () => {
        this.props.dispatch(setUserAuthorisation(this.props.dispatch, false));
    };

    login = (user) => {
        localStorage.setItem('user', user.email);
        localStorage.setItem('password', user.password);

        this.props.dispatch(loginUserTry(this.props.dispatch, user))
            .catch((data) => {
                this.setState({errorAuthorisation: data})
            });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.login(this.loginForm.value);
    };

    checkAuthorisationError = () => {
        return this.state.errorAuthorisation ?
            <div className={'request-error authorisation-error'}>{this.state.errorAuthorisation}</div> : null;
    };

    render() {
        return this.state.editable ? (
            <div className={'authorisation-div'}>
                <div className={'authorisation-header'}>Авторизация</div>
                {this.checkAuthorisationError()}
                <FieldGroup
                    control={this.loginForm}
                    render={({get, invalid}) => (
                        <form className={'authorisation'} onSubmit={this.handleSubmit}
                              onClick={e => e.stopPropagation()}>

                            <div className={'authorisation-inputs'}>
                                <div>
                                    <div className='form-title'>Email:</div>
                                    <FieldControl
                                        name="email"
                                        render={TextInput}
                                        meta={{label: "email", icon: 'envelope', type: 'text'}}
                                    />
                                </div>

                                <div>
                                    <div className='form-title'>Пароль</div>
                                    <FieldControl
                                        name="password"
                                        render={TextInput}
                                        meta={{label: "пароль", icon: 'eye slash', type: 'password'}}
                                    />
                                </div>
                            </div>
                            <Button.Group>
                                <Button
                                    type="button"
                                    onClick={this.handleReset}
                                >Отмена</Button>
                                <Button.Or text=''/>
                                <Button
                                    type="submit"
                                    disabled={invalid}
                                    positive>Войти</Button>
                            </Button.Group>

                        </form>
                    )}
                />
            </div>
        ) : null
    };
}


function mapStateToProps(state) {
    return {
        userForAuthorisation: state.userForAuthorisation,
    };
}

export default connect(mapStateToProps)(AuthorisationForm);