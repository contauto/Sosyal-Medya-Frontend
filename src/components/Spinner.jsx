import React from "react";
import { useTranslation } from "react-i18next";


export default function Spinner() {
  const {t}=useTranslation()
  return (
    <div className="text-center">
      <div className="spinner-border text-dark-50" role="status">
        <span className="visually-hidden">{t("Loading")}</span>
      </div>
    </div>
  );
}
