import React, { Component } from "react";
import { getUsers } from "../api/ApiCalls";
import { withTranslation } from "react-i18next";
import UserListItem from "./UserListItem";

class UserList extends Component {
  state = {
    page: {
      content: [],
      size: 3,
      number: 0,
    },
  };

  loadUsers = (page) => {
    getUsers(page).then((response) => {
      this.setState({
        page: response.data,
      });
    });
  };

  componentDidMount() {
    this.loadUsers();
  }

  onClickNext=()=>{
  const nextPage=this.state.page.number+1
  this.loadUsers(nextPage)
  }

  onClickPrevious=()=>{
    const previousPage=this.state.page.number-1
    this.loadUsers(previousPage)
  }

  render() {
    const { content: users, last, first } = this.state.page;
    const { t } = this.props;
    return (
      <div className="card">
        <h3 className="card-header text-center">{t("Users")}</h3>
        <div className="list-group-flush">
          {users.map((user) => (
            <UserListItem key={user.username} user={user}>
              {user.username}
            </UserListItem>
          ))}
        </div>
        <div>
          {first === false && (
            <button onClick={this.onClickPrevious} className="btn btn-sm btn-light">{t("Previous")}</button>
          )}
          {last === false && (
            <button onClick={this.onClickNext} className="btn btn-sm btn-light float-end">
              {t("Next")}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default withTranslation()(UserList);
