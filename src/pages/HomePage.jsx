import React from "react";
import UserList from "../components/UserList";
import SosPost from "../components/SosPost";
import { useSelector } from "react-redux";
import SosFeed from "../components/SosFeed";


export default function HomePage() {

  const {isLoggedIn}=useSelector(store=>({
    isLoggedIn:store.isLoggedIn
  }))

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8 mb-1">
          {isLoggedIn&&<SosPost />}
        </div>
        <div className="col-12 col-md-4 mt-1">
          <UserList />
        </div>
        <div className="mt-2">
          <SosFeed/>
        </div>
      </div>
    </div>
  );
}
