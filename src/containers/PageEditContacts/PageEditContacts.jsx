import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Button, Confirm, Pagination} from "semantic-ui-react";
import {toast} from "react-toastify";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import Loader from "../../components/Loader/Loader";
import UserAddCard from "../../components/PageEditContacts/UserAddCard/UserAddCard";
import UserForEditList from "../../components/PageEditContacts/UserForEditList/UserForEditList";
import SearchFormForAdmin from "../../components/PageEditContacts/SearchFormForAdmin/SearchFormForAdmin";
import {
    deleteContactTry,
    getAllUsersTry,
    resetSearchParams,
    setPage,
    setSearchPattern
} from "../../store/actions/editUserActions";
import {getVisibleContacts} from "../../store/selectors/editContactSelectors";
import "./PageEditContacts.css";

class PageEditContacts extends React.PureComponent {

    static propTypes = {
        usersListForEdit: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            openConfirm: false,
            user: '',
            userId: '',
            requestError: false
        }
    }

    componentDidMount() {
        this.getAllUsers();
        if (this.props.location.search) {
            const search = new URLSearchParams(this.props.location.search);
            const searchPattern = search.get("f");
            const pageNumber = search.get("page");

            if (searchPattern) {
                this.props.dispatch(setSearchPattern(this.props.dispatch, searchPattern));
            }
            if (pageNumber) {
                const page = /^\d+$/.test(pageNumber) ? pageNumber : 1;
                this.props.dispatch(setPage(this.props.dispatch, page));
            }
            return null;
        }
        const {usersListForEdit: {paginationOptions: {page}, searchOptions}} = this.props;
        const searchParam = searchOptions ? `f=${searchOptions}&` : '';
        this.props.history.push(`?${searchParam}page=${page}`);
    }

    clickSearch = (searchLetters) => {
        this.props.history.push(`?f=${searchLetters}&page=1`);
        return this.props.dispatch(setSearchPattern(this.props.dispatch, searchLetters));
    };

    getAllUsers = () => {
        this.props.dispatch(getAllUsersTry(this.props.dispatch));
    };

    resetSearchParams = () => {
        this.props.dispatch(resetSearchParams(this.props.dispatch));
        this.getAllUsers();
        this.props.history.push('?page=1');
    };

    usersSet = (usersList) => {
        return usersList.map(user => (
            <CSSTransition timeout={200} classNames="user" key={user.id}>
                <UserForEditList user={user} cbOpenConfirm={this.openConfirm}/>
            </CSSTransition>
        ))
    };

    editNewUser = () => {
        toast("Пользователь сохранен");
        this.props.history.push(`/editUser/${this.props.usersListForEdit.addedContact}`);
    };

    deleteContact = () => {
        const contact = this.state.userId;
        this.props.dispatch(deleteContactTry(this.props.dispatch, contact))
            .then(() => toast("Пользователь удален"))
            .catch((data) => this.setState({
                    requestError: data,
                }
            ));
        this.closeConfirm()
    };

    editing = () => {
        const isEdit = !this.state.isEdit;
        this.setState({
            isEdit: isEdit,
        })
    };

    createUpdating = () => {
        switch (this.props.usersListForEdit.updateStatus) {
            case 1:
                return <div>Loading...</div>;
            default:
                return null;
        }
    };

    openConfirm = (contact) => {
        const user = this.props.usersListForEdit.usersList.find(user => Number(user.id) === Number(contact));
        this.setState({
            openConfirm: true,
            user: `${user.surname} ${user.name} ${user.patronym}`,
            userId: contact
        })
    };

    closeConfirm = () => {
        this.setState({
            openConfirm: false,
            user: '',
            userId: '',
        });
    };

    createNewUserForm = () => {
        return this.state.isEdit ? <UserAddCard editNewUserCB={this.editNewUser} stopEdit={this.editing}/> : null;
    };

    handlePageChange = (e, {activePage}) => {
        const pattern = /^\?(s|f)=.*&/gi;
        const firstPart = pattern.test(decodeURI(this.props.location.search));
        const searchParam = (firstPart ? firstPart : '?') + `page=${activePage}`;
        this.props.history.push(searchParam);
        return this.props.dispatch(setPage(this.props.dispatch, activePage));
    };

    getTotalPages = () => {
        const {usersListForEdit: {totalElements, paginationOptions: {limit}}} = this.props;
        return Math.ceil(totalElements / limit);
    };

    showEmptyList = (usersList) => {
        return usersList.length ? null : <div className={'no-contact'}>По заданным параметрам данные не найдены</div>;
    };

    checkRequestStatus = () => {
        return this.props.usersListForEdit.status === 2 ?
            <div className={'request-error'}>{this.props.usersListForEdit.error}</div> :
            <Loader/>
    };

    showRequestError = () => {
        return this.state.requestError ? <div className={'request-error delete-user-error'}>
            {this.state.requestError}</div> : null;
    };

    deleteError = () => {
        if(this.state.requestError) {
            return this.setState({requestError: false});
        }
    };


    render() {
        const {usersListForEdit} = this.props;
        const {usersListForEdit: {paginationOptions: {page}}} = this.props;

        return usersListForEdit.status <= 2 ? this.checkRequestStatus() : (
            <div onClick={this.deleteError} className={'page-container'}>
                {this.showRequestError()}
                <SearchFormForAdmin searchFunc={this.clickSearch}/>
                <Button className={'all-users-button'} size='small' onClick={this.resetSearchParams}>Все</Button>
                <div className={'edit-user-page'}>
                    <TransitionGroup>
                        {this.usersSet(usersListForEdit.usersList)}
                    </TransitionGroup>
                    {this.showEmptyList(usersListForEdit.usersList)}
                </div>
                <Button className={'all-users-button edit-user-page-button'} size='small' onClick={this.editing}
                        disabled={this.state.isEdit}>Добавить</Button>
                {this.createUpdating(usersListForEdit.usersList)}

                <Confirm
                    open={this.state.openConfirm}
                    content={`Вы действительно хотите удалить пользователя ${this.state.user}?`}
                    onCancel={this.closeConfirm}
                    onConfirm={this.deleteContact}
                />
                {this.createNewUserForm()}
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
        usersListForEdit: getVisibleContacts(state),
    };
}

export default connect(mapStateToProps)(PageEditContacts);