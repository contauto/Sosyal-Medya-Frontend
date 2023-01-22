import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getOldSosses, getSosses } from "../api/ApiCalls";
import SosView from "./SosView";
import { useApiProgress } from "../shared/ApiProgress";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";

export default function SosFeed() {
  const [sosPage, setSosPage] = useState({
    content: [],
    last: true,
    number: 0,
  });
  const { t } = useTranslation();
  const { username } = useParams();
  const path = username
    ? "/api/1.0/users/" + username + "/sosses?page="
    : "/api/1.0/sosses?page=";
  const initialSosLoadProgress = useApiProgress("get", path);

  let lastSosId = 0;
  if (sosPage.content.length > 0) {
    const lastSosIndex = sosPage.content.length - 1;
    lastSosId = sosPage.content[lastSosIndex].id;
  }

  const oldSosPath=username?
  "/api/1.0/users/"+username+"/sosses/"+lastSosId:
  "/api/1.0/sosses/"+lastSosId


  const loadOldSossesProgress = useApiProgress(
    "get",
    oldSosPath,
    true
  );

  let divClassName = "alert text-center alert-";
  initialSosLoadProgress
    ? (divClassName += "secondary")
    : (divClassName += "danger");

  useEffect(() => {
    const loadSosses = async (page) => {
      try {
        const response = await getSosses(username, page);
        setSosPage((previousSosPage) => ({
          ...response.data,
          content: [...previousSosPage.content, ...response.data.content],
        }));
      } catch (error) {}
    };
    loadSosses();
  }, [username]);

  const loadOldSosses = async () => {
    const response = await getOldSosses(lastSosId,username);
    setSosPage((previousSosPage) => ({
      ...response.data,
      content: [...previousSosPage.content, ...response.data.content],
    }));
  };

  const { content, last } = sosPage;


  


  if (content.length === 0) {
    return (
      <div className={divClassName}>
        {initialSosLoadProgress ? <Spinner /> : t("There are no sosses")}
      </div>
    );
  }

  return (
    <div>
      {content.map((sos) => {
        return <SosView key={sos.id} sos={sos} />;
      })}
      {!last && (
        <div
          style={{ cursor: !loadOldSossesProgress ? "pointer" : "not-allowed" }}
          onClick={loadOldSossesProgress ? () => {} : () => loadOldSosses()}
          className="alert alert-success text-center"
        >
          {loadOldSossesProgress ? <Spinner /> : t("Load old sosses")}
        </div>
      )}
    </div>
  );
}
