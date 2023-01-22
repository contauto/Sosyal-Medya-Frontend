import { changeLanguage } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSelector(props) {
  const { i18n } = useTranslation();
  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    changeLanguage(language);
  };
  return (
    <div className="container">
      <img
        alt="us"
        src="https://flagcdn.com/h20/us.png"
        onClick={() => onChangeLanguage("en")}
        style={{ cursor: "pointer" }}
      ></img>
      <img
        alt="tr"
        src="https://flagcdn.com/h20/tr.png"
        onClick={() => onChangeLanguage("tr")}
        style={{ cursor: "pointer" }}
      ></img>
    </div>
  );
}
export default LanguageSelector;
