import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import SearchForm from "../../PageSearch/SearchForm/SearchForm";

class SearchField extends React.PureComponent {

    static propTypes = {
        usersListForEdit: PropTypes.object.isRequired,
        searchFunc: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            initialValue: '',
        };
    }

    componentDidMount() {
        this.setState({
            initialValue: this.props.usersListForEdit.searchOptions,
        })
    }

    handleSubmit = (userName) => {
        this.props.searchFunc(userName);
        this.setState({initialValue: userName})
    };

    render() {
        return (
            <div className={'search-field'}>
                <SearchForm cbHandleSubmit={this.handleSubmit}
                            fullNamePattern={this.props.usersListForEdit.searchOptions}
                            initialValue={this.state.initialValue}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        usersListForEdit: state.usersListForEdit,
    };
}

export default connect(mapStateToProps)(SearchField);