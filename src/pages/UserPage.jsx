import React, { useEffect, useState } from "react";

import ProfileCard from "../components/ProfileCard";
import { useParams } from "react-router-dom";
import { getUser } from "../api/ApiCalls";
import { useTranslation } from "react-i18next";

const UserPage = (props) => {
  const [user, setUser] = useState();
  const {username} = useParams();
  const [error,setError]=useState(false)

  useEffect(() => {
    setError(false)
  }, [user])
  

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getUser(username);
        setUser(response.data);
      } catch (error) {
        setError(true)
      }
    };
    loadUser()
  }, [username]);

const {t}=useTranslation()

if(error){
return(
  <div className="container text-center">
    <div className="alert alert-danger">
      <div>
         
    <i className="material-icons" style={{ fontSize: '48px' }}>
              error
            </i>
      </div>
  {t("User Not Found")}
</div>
  </div>
)
}


  return (
    <div className="container">
      <ProfileCard />
    </div>
  );
};

export default UserPage;
