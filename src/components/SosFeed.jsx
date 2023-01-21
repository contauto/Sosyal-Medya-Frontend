import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSosses } from "../api/ApiCalls";
import SosView from "./SosView";
import { useApiProgress } from "../shared/ApiProgress";
import Spinner from "./Spinner";

export default function SosFeed() {
  const [sosPage, setSosPage] = useState({
    content: [],
    last: true,
    number: 0,
  });
  const { t } = useTranslation();
  const pendingApiCall = useApiProgress("get", "/api/1.0/sosses");

  const loadSosses = async (page) => {
    try {
      const response = await getSosses(page);
      setSosPage((previousSosPage) => ({
        ...response.data,
        content: [...previousSosPage.content, ...response.data.content],
      }));
    } catch (error) {}
  };

  const { content, last, number } = sosPage;

  let divClassName = "alert text-center alert-";
  pendingApiCall ? (divClassName += "secondary") : (divClassName += "danger");

  useEffect(() => {
    loadSosses();
  }, []);

  if (content.length === 0) {
    return (
      <div className={divClassName}>
        {pendingApiCall ? <Spinner /> : t("There are no sosses")}
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
          style={{ cursor: !pendingApiCall? "pointer":"not-allowed" }}
          onClick={
            pendingApiCall ? () => {} : () => loadSosses(number + 1)
          }
          className="alert alert-success text-center"
        >
          {pendingApiCall?<Spinner/>:t("Load old sosses")}
        </div>
      )}
    </div>
  );
}
