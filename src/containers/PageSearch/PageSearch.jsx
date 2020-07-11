import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Button, Pagination} from "semantic-ui-react";

import Loader from "../../components/Loader/Loader";
import SearchField from "../../components/PageSearch/SearchField/SearchField";
import SearchContainer from "../../components/PageSearch/SearchContainer/SearchContainer";
import {
    getAllContactsTry,
    resetSearchParams,
    setFullnamePattern,
    setPage,
    setSurnameLetter
} from "../../store/actions/contactsActions";
import {getVisibleContacts} from "../../store/selectors/contactSelectors";
import "./PageSearch.css";

class PageSearch extends React.PureComponent {

    static propTypes = {
        contacts: PropTypes.object.isRequired,
    };

    constructor() {
        super();
        this.state = {
            clickedLetter: '',
        }
    }

    componentDidMount() {
        this.getAllClients();
        if (this.props.location.search) {
            const search = new URLSearchParams(this.props.location.search);
            const surnameLetter = search.get("s");
            const fullnamePattern = search.get("f");
            const pageNumber = search.get("page");

            if (surnameLetter) {
                this.props.dispatch(setSurnameLetter(this.props.dispatch, surnameLetter));
                this.setState({clickedLetter: surnameLetter});
            }
            if (fullnamePattern) {
                this.props.dispatch(setFullnamePattern(this.props.dispatch, fullnamePattern));
            }
            if (pageNumber) {
                const page = /^\d+$/.test(pageNumber) ? pageNumber : 1;
                this.props.dispatch(setPage(this.props.dispatch, page));
            }
            return null;
        }
        const {contacts: {paginationOptions: {page}, searchOptions: {surnameLetter, fullNamePattern}}} = this.props;
        const surnameSearchParam = surnameLetter ? `s=${surnameLetter}&` : '';
        const fullnameSearchParam = fullNamePattern ? `f=${fullNamePattern}&` : '';
        this.props.history.push(`?${surnameSearchParam}${fullnameSearchParam}page=${page}`);
    };

    clickLetter = (letter) => {
        this.props.history.push(`?s=${letter}&page=1`);
        this.setState({clickedLetter: letter});
        return this.props.dispatch(setSurnameLetter(this.props.dispatch, letter));
    };

    clickSearch = (searchLetters) => {
        this.props.history.push(`?f=${searchLetters}&page=1`);
        this.setState({clickedLetter: ''});
        return this.props.dispatch(setFullnamePattern(this.props.dispatch, searchLetters));
    };

    getAllClients = () => {
        this.props.dispatch(getAllContactsTry(this.props.dispatch));
    };

    resetSearchParams = () => {
        this.props.dispatch(resetSearchParams(this.props.dispatch));
        this.setState({clickedLetter: ''});
        this.getAllClients();
        this.props.history.push('?page=1');
    };

    handlePageChange = (e, {activePage}) => {
        const pattern = /^\?(s|f)=.*&/gi;
        const firstPart = pattern.test(decodeURI(this.props.location.search));
        const searchParam = (firstPart ? firstPart : '?') + `page=${activePage}`;
        this.props.history.push(searchParam);
        return this.props.dispatch(setPage(this.props.dispatch, activePage));
    };

    getTotalPages = () => {
        const {contacts: {totalElements, paginationOptions: {limit}}} = this.props;
        return Math.ceil(totalElements / limit);
    };

    showSearchForm = () => {
        return this.props.contacts.status <= 1 ? <Loader/> : <SearchField searchFunc={this.clickSearch}/>
    };

    createSearchContainer = () => {
        return this.props.contacts.ctatus <= 2 ? null :
            <SearchContainer cbClickLetter={this.clickLetter} clickedLetter={this.state.clickedLetter}/>
    };

    render() {

        const {contacts: {paginationOptions: {page}}} = this.props;
        return this.props.contacts.status === 2 ? <div className={'request-error'}>{this.props.contacts.error}</div> : (
            <div className={'page-container'}>
                <div className={'main-header'}>Телефонный справочник <br/>ООО "Дети дикой обезьяны"</div>
                {this.showSearchForm()}
                <Button className={'all-users-button'} size='small' onClick={this.resetSearchParams}>Все</Button>
                {this.createSearchContainer()}

                <Pagination
                    activePage={page}
                    onPageChange={this.handlePageChange}
                    totalPages={this.getTotalPages()}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        contacts: getVisibleContacts(state),
    };
}

export default connect(mapStateToProps)(PageSearch);