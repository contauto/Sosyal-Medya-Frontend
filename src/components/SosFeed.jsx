import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getNewSosCount,
  getNewSosses,
  getOldSosses,
  getSosses,
} from "../api/ApiCalls";
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
  const [newSosCount, setNewSosCount] = useState(0);

  const path = username
    ? "/api/1.0/users/" + username + "/sosses?page="
    : "/api/1.0/sosses?page=";
  const initialSosLoadProgress = useApiProgress("get", path);

  let lastSosId = 0;
  let firstSosId = 0;

  if (sosPage.content.length > 0) {
    firstSosId = sosPage.content[0].id;
    const lastSosIndex = sosPage.content.length - 1;
    lastSosId = sosPage.content[lastSosIndex].id;
  }

  const oldSosPath = username
    ? "/api/1.0/users/" + username + "/sosses/" + lastSosId
    : "/api/1.0/sosses/" + lastSosId;

  const newSosPath = username
    ? `/api/1.0/users/${username}/sosses/${firstSosId}?direction=after`
    : `/api/1.0/sosses/${firstSosId}?direction=after`;

  const loadOldSossesProgress = useApiProgress("get", oldSosPath, true);

  const loadNewSossesProgress = useApiProgress("get", newSosPath, true);

  let divClassName = "alert text-center alert-";
  initialSosLoadProgress
    ? (divClassName += "secondary")
    : (divClassName += "danger");


  const onDeleteSosSuccess=(id)=>{

    setSosPage(previousSosPage=>({
      ...previousSosPage,
      content:previousSosPage.content.filter(sos=>sos.id!==id)
    }))

  }

  useEffect(() => {
    const getCount = async () => {
      const response = await getNewSosCount(firstSosId, username);
      setNewSosCount(response.data.count);
    };
    let looper = setInterval(getCount, 10000);
    return function cleanUp() {
      clearInterval(looper);
    };
  }, [firstSosId, username]);

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
    const response = await getOldSosses(lastSosId, username);
    setSosPage((previousSosPage) => ({
      ...response.data,
      content: [...previousSosPage.content, ...response.data.content],
    }));
  };

  const loadNewSosses = async () => {
    const response = await getNewSosses(firstSosId, username);
    setSosPage((previousSosPage) => ({
      ...previousSosPage,
      content: [...response.data, ...previousSosPage.content],
    }));
    setNewSosCount(0);
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
      <div>
        {newSosCount > 0 && (
          <div
            className="alert alert-success text-center mt-2"
            style={{
              cursor: loadNewSossesProgress ? "not-allowed" : "pointer",
            }}
            onClick={loadNewSossesProgress ? () => {} : loadNewSosses}
          >
            {loadNewSossesProgress ? <Spinner /> : t("There are new sosses")}
          </div>
        )}
      </div>

      {content.map((sos) => {
        return <SosView key={sos.id} sos={sos} onDeleteSos={onDeleteSosSuccess} />;
      })}
      {!last && (
        <div
          style={{ cursor: !loadOldSossesProgress ? "pointer" : "not-allowed" }}
          onClick={loadOldSossesProgress ? () => {} : loadOldSosses}
          className="alert alert-success text-center"
        >
          {loadOldSossesProgress ? <Spinner /> : t("Load old sosses")}
        </div>
      )}
    </div>
  );
}
