import React from "react";
import {Button} from "semantic-ui-react";
import PropTypes from "prop-types";

export default class EditStructureButtons extends React.PureComponent {

    static propTypes = {
        step: PropTypes.object.isRequired,
        cbHandleCarry: PropTypes.func.isRequired,
        cbCheckEmployees: PropTypes.func.isRequired,
        cbHandleEdit: PropTypes.func.isRequired,
        cbHandleAdd: PropTypes.func.isRequired,
    };

    showCarryButton = () => {
        return 'parent' in this.props.step ?
            <Button className={'button-edit-structure'} onClick={this.props.cbHandleCarry}>Перенести</Button> : null;
    };

    showDeleteButton = () => {
        const isDisable = Boolean(this.props.step.children.length);
        return 'parent' in this.props.step ?
            <Button className={'button-edit-structure'} onClick={this.props.cbCheckEmployees} disabled={isDisable}>
                Удалить
            </Button> : null;
    };

    render() {
        return (
            <div className={'edit-structure-buttons'}>
                <div className={'edit-structure-buttons-row'}>
                    <Button className={'button-edit-structure'} onClick={this.props.cbHandleEdit}>Изменить</Button>
                    <Button className={'button-edit-structure'} onClick={this.props.cbHandleAdd}>Добавить</Button>
                </div>
                <div className={'edit-structure-buttons-row'}>
                    {this.showCarryButton()}
                    {this.showDeleteButton()}
                </div>
            </div>
        )
    }
}