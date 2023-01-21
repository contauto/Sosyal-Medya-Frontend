import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { useTranslation } from "react-i18next";
import { postSos } from "../api/ApiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";

export default function SosPost() {
  const { image } = useSelector((store) => ({
    image: store.image,
  }));

  const [focused, setFocused] = useState(false);
  const [sos, setSos] = useState("");
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const pendingApiCall = useApiProgress("post", "/api/1.0/sosses");

  useEffect(() => {
    if (!focused) {
      setSos("");
      setErrors({});
    }
  }, [focused]);

  useEffect(() => {
    setErrors({});
  }, [sos]);

  const onClickSosio = async () => {
    const body = {
      content: sos,
    };

    try {
      await postSos(body);
      setFocused(false);
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  let textAreaClass = "form-control";
  if (errors.content) {
    textAreaClass += " is-invalid";
  }

  return (
    <div className="card p-4 flex-row">
      <ProfileImageWithDefault
        image={image}
        width={32}
        height={32}
        className={"rounded-circle me-1"}
      />
      <div className="flex-fill">
        <textarea
          className={textAreaClass}
          rows={focused ? "3" : "1"}
          onFocus={() => {
            setFocused(true);
          }}
          onChange={(event) => {
            setSos(event.target.value);
          }}
          value={sos}
        />
        <div className="invalid-feedback">{errors.content}</div>
        {focused && (
          <div className="text-end mt-3">
            <ButtonWithProgress
              text="Sosio"
              disabled={pendingApiCall}
              pendingApiCall={pendingApiCall}
              onClick={onClickSosio}
              className="btn btn-info"
            />
            <button
              className="btn btn-danger d-inline-flex ms-1"
              disabled={pendingApiCall}
              onClick={() => {
                setFocused(false);
              }}
            >
              {" "}
              <i className="material-icons">close</i>
              {t("Cancel")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
