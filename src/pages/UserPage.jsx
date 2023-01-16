import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner"
import ProfileCard from "../components/ProfileCard";
import { useParams } from "react-router-dom";
import { getUser } from "../api/ApiCalls";
import { useTranslation } from "react-i18next";
import { useApiProgress } from "../shared/ApiProgress";

const UserPage = (props) => {

  const [user, setUser] = useState({});
  const {username} = useParams();
  const [error,setError]=useState(false)
  const pendingApiCall=useApiProgress("/api/1.0/users/"+username)
  
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

if(pendingApiCall){
  return <Spinner/>
}

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
      <ProfileCard user={user} />
    </div>
  );
};

export default UserPage;
