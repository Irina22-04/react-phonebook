import React from "react";
import {Modal} from "semantic-ui-react";
import PropTypes from "prop-types";

class DeleteBanEdit extends React.PureComponent {

    static propTypes = {
        stopShow: PropTypes.func.isRequired,
    };

    render() {
        return (
            <Modal open={true}>
                <Modal.Header>Структурное подразделение не может быть удалено.
                    За структурным подразделением закреплены работники</Modal.Header>
                <Modal.Content>
                    <button
                        type="button"
                        onClick={this.props.stopShow}
                    >
                        ОК
                    </button>
                </Modal.Content>
            </Modal>

        );

    }
}


export default DeleteBanEdit;