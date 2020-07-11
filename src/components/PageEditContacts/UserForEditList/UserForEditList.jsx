import React from "react";
import {Link} from "react-router-dom";
import {Button} from "semantic-ui-react";
import PropTypes from "prop-types";

import "./UserForEditList.css";

export default class UserForEditList extends React.PureComponent {

    static propTypes = {
        user: PropTypes.object.isRequired,
        cbOpenConfirm: PropTypes.func.isRequired,
    };

    openConfirm = (e) => {
        const contact = e.target.getAttribute('id');
        this.props.cbOpenConfirm(contact);
    };

    render() {
        const {user} = this.props;
        return (

            <div
                className={'contact-wrapper'}
                id={user.id}>
                <div className={'user-name'}>
                    {`${user.surname} ${user.name} ${user.patronym}`}
                </div>

                <div className={'edit-user-buttons'}>
                    <Button.Group>
                        <Button
                            id={user.id}
                            type="button"
                            onClick={this.openConfirm}>
                            Удалить
                        </Button>
                        <Button.Or text=''/>
                        <Link to={`/editUser/${user.id}`} key={user.id}>
                            <Button
                                type="button"
                                positive>
                                Редактировать
                            </Button>
                        </Link>
                    </Button.Group>
                </div>
            </div>
        )
    }

}