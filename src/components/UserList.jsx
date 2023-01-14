import React, { useEffect, useState } from "react";
import { getUsers } from "../api/ApiCalls";
import { useTranslation } from "react-i18next";
import UserListItem from "./UserListItem";

const UserList =()=>  {
  const [page,setPage]=useState({
      content: [],
      size: 3,
      number: 0,
    
  })

  useEffect(() => {
    loadUsers()
  }, [])
  


 const loadUsers = (page) => {
    getUsers(page).then((response) => {
        setPage(response.data)
 })
  }


  const onClickNext=()=>{
  const nextPage=page.number+1
  loadUsers(nextPage)
  }

  const onClickPrevious=()=>{
    const previousPage=page.number-1
    loadUsers(previousPage)
  }

  
    const { content: users, last, first } = page;
    const { t } = useTranslation();
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
            <button onClick={onClickPrevious} className="btn btn-sm btn-light">{t("Previous")}</button>
          )}
          {last === false && (
            <button onClick={onClickNext} className="btn btn-sm btn-light float-end">
              {t("Next")}
            </button>
          )}
        </div>
      </div>
    );
  }


export default UserList;
