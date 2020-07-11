import React from "react";
import {get} from "lodash";
import {Button} from "semantic-ui-react";

import {getContactById, getStructure} from "../../utils/api";
import Loader from "../../components/Loader/Loader";
import UserCard from "../../components/PageUser/UserCard";
import "./PageUser.css";

class PageUser extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            user: '',
            status: 0,
            error: '',
            structure: [],
            structureStatus: 0,
        }
    }

    componentDidMount() {
        let {id} = this.props.match.params;
        id = Number(id);
        this.getUserTry(id);
        this.getStructureTry();
    };

    getUserTry = async (id) => {
        this.setState({
            status: 1
        });
        return await getContactById(id)
            .then(data => {
                this.setState({
                    status: 3,
                    user: data.data,
                })
            })
            .catch(e => {
                    this.setState({
                        status: 2,
                        error: get(e, ['response', 'data', 'error_message'], e.message)
                    });
                }
            )
    };

    getStructureTry = async () => {
        this.setState({
            structureStatus: 1
        });
        return await getStructure()
            .then(data => {
                this.setState({
                    structureStatus: 3,
                    structure: data.data,
                })
            })
            .catch(e => {
                    this.setState({
                        structureStatus: 2,
                        error: get(e, ['response', 'data', 'error_message'], e.message)
                    });
                }
            )
    };

    createUserCard = (department) => {
        return this.state.user && department ? <UserCard user={this.state.user} department={department}/> : null
    };

    backToList = () => {
        this.props.history.push(`/search`);
    };

    render() {
        const loadStatus = this.state.status <= 1 || this.state.structureStatus <= 1;
        const department = loadStatus ? null : this.state.structure
            .find(structure => Number(structure.id) === Number(this.state.user.department))
            .name;
        return loadStatus ? <Loader/> : (
            <div className={'user-card'}>
                <div>Просмотр контакта</div>
                {this.createUserCard(department)}
                <Button
                    type="submit"
                    onClick={this.backToList}
                    positive>Вернуться к списку</Button>
            </div>
        )
    }
}

export default PageUser;