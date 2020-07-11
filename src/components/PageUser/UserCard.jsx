import React from "react";
import {Icon, List} from "semantic-ui-react";
import PropTypes from "prop-types";

export default class UserCard extends React.PureComponent {
    static propTypes = {
        user: PropTypes.object.isRequired,
        department: PropTypes.string.isRequired,
    };

    showAddFields = () => {
        const businessMobile = this.props.user.businessMobile ? <List.Item>
            <List.Header><Icon name={'mobile alternate'}/>Служебный моб. телефон</List.Header>
            {this.props.user.phone}
        </List.Item> : null;

        const personalMobile = this.props.user.personalMobile ? <List.Item>
            <List.Header><Icon name={'mobile alternate'}/>Личный моб. телефон</List.Header>
            {this.props.user.phone}
        </List.Item> : null;

        const personalEmail = this.props.user.personalEmail ? <List.Item>
            <List.Header><Icon name={'envelope'}/>Личная эл.почта</List.Header>
            {this.props.user.personalEmail}
        </List.Item> : null;

        const birthday = this.props.user.birthday ? <List.Item>
            <List.Header><Icon name={'calendar alternate outline'}/>День рождения</List.Header>
            {this.props.user.birthday}
        </List.Item> : null;

        return (
            <React.Fragment>
                {businessMobile}
                {personalMobile}
                {personalEmail}
                {birthday}
            </React.Fragment>
        )
    };

    render() {
        return (
            <List>
                <List.Item>
                    <List.Header><Icon name={'address book'}/>ФИО</List.Header>
                    {`${this.props.user.surname} ${this.props.user.name} ${this.props.user.patronym}`}
                </List.Item>
                <List.Item>
                    <List.Header><Icon name={'briefcase'}/>Подразделение</List.Header>
                    {this.props.department}
                </List.Item>
                <List.Item>
                    <List.Header><Icon name={'id badge'}/>Должность</List.Header>
                    {this.props.user.position}
                </List.Item>
                <List.Item>
                    <List.Header><Icon name={'phone'}/>Телефон</List.Header>
                    {this.props.user.phone}
                </List.Item>
                <List.Item>
                    <List.Header><Icon name={'envelope outline'}/>Эл.почта</List.Header>
                    {this.props.user.email}
                </List.Item>
                {this.showAddFields()}
            </List>
        )
    }
}