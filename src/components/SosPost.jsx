import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { useTranslation } from "react-i18next";
import { postSos, postSosAttachment } from "../api/ApiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
import Input from "./Input";
import AutoUploadImage from "./AutoUploadImage";

export default function SosPost() {
  const { image } = useSelector((store) => ({
    image: store.image,
  }));

  const [focused, setFocused] = useState(false);
  const [sos, setSos] = useState("");
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [newImage, setNewImage] = useState();
  const [attachmentId,setAttachmentId]=useState()

  const pendingApiCall = useApiProgress("post", "/api/1.0/sosses", true);
  const pendingImageCall = useApiProgress(
    "post",
    "/api/1.0/sos-attachments",
    true
  );

  useEffect(() => {
    if (!focused) {
      setSos("");
      setErrors({});
      setNewImage();
      setAttachmentId()
    }
  }, [focused]);

  useEffect(() => {
    setErrors({});
  }, [sos]);

  const onClickSosio = async () => {
    const body = {
      content: sos,
      attachmentId
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

  const onChangeFile = (e) => {
    if (e.target.files.length < 1) {
      return;
    }
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
      uploadFile(file);
    };
    fileReader.readAsDataURL(file);
  };

  const uploadFile = async (file) => {
    const attachment = new FormData();
    attachment.append("file", file);
    const response=await postSosAttachment(attachment);
    setAttachmentId(response.data.id)
  };

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
          <>
            {!newImage && (
              <Input
                type="file"
                onChange={onChangeFile}
                className="form-control"
              />
            )}

            {newImage && (
              <AutoUploadImage width={300} uploading={pendingImageCall} image={newImage} />
            )}

            <div className="text-end mt-3">
              <ButtonWithProgress
                text="Sosio"
                disabled={pendingApiCall||pendingImageCall}
                pendingApiCall={pendingApiCall}
                onClick={onClickSosio}
                className="btn btn-info"
              />
              <button
                className="btn btn-danger d-inline-flex ms-1"
                disabled={pendingApiCall||pendingImageCall}
                onClick={() => {
                  setFocused(false);
                }}
              >
                {" "}
                <i className="material-icons">close</i>
                {t("Cancel")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
