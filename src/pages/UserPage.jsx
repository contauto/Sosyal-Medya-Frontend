import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ProfileCard from "../components/ProfileCard";
import { useParams } from "react-router-dom";
import { getUser } from "../api/ApiCalls";
import { useTranslation } from "react-i18next";
import { useApiProgress } from "../shared/ApiProgress";
import SosFeed from "../components/SosFeed";

const UserPage = (props) => {
  const [user, setUser] = useState({});
  const { username } = useParams();
  const [error, setError] = useState(false);
  const pendingApiCall = useApiProgress(
    "get",
    "/api/1.0/users/" + username,
    true
  );

  const { t } = useTranslation();

  useEffect(() => {
    setError(false);
  }, [user]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getUser(username);
        setUser(response.data);
      } catch (error) {
        setError(true);
      }
    };
    loadUser();
  }, [username]);

  if (error) {
    return (
      <div className="container text-center">
        <div className="alert alert-danger">
          <div>
            <i className="material-icons" style={{ fontSize: "48px" }}>
              error
            </i>
          </div>
          {t("User Not Found")}
        </div>
      </div>
    );
  }

  if (pendingApiCall || user.username !== username) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <ProfileCard user={user} />
        </div>
        <div className="col-sm-12 col-md-6">
          <SosFeed />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
