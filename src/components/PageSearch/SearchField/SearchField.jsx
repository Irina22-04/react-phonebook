import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import SearchForm from "../SearchForm/SearchForm";
import "./SearchField.css";

class SearchField extends React.PureComponent {

    static propTypes = {
        contacts: PropTypes.object.isRequired,
        searchFunc: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            initialValue: '',
            isRenderForm: false,
        };
    }

    componentDidMount() {
        this.setState({
            initialValue: this.props.contacts.searchOptions.fullNamePattern,
            isRenderForm: true,
        })
    }

    handleSubmit = (userName) => {
        this.props.searchFunc(userName);
        this.setState({initialValue: userName});
    };

    render() {
        return this.state.isRenderForm ? (
            <div className={'search-field'}>
                <SearchForm cbHandleSubmit={this.handleSubmit}
                            fullNamePattern={this.props.contacts.searchOptions.fullNamePattern}
                            surnameLetter={this.props.contacts.searchOptions.surnameLetter}
                            initialValue={this.state.initialValue}
                />
            </div>
        ) : null;
    }
}

function mapStateToProps(state) {
    return {
        contacts: state.contactsForSearch,
    };
}

export default connect(mapStateToProps)(SearchField);