import React, { useState } from "react";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { deleteSos } from "../api/ApiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import Modal from "./Modal";


export default function SosView(props) {
  const loggedInUsername = useSelector((store) => store.username);
  const { sos, onDeleteSos } = props;
  const { userDto, content, timestamp, fileAttachmentDto, id } = sos;
  const { name, username, image } = userDto;
  const { t, i18n } = useTranslation();
  const formatted = format(timestamp, i18n.language);
  const ownedByLoggedInUser = loggedInUsername === username;
  const [modalVisible, setModalVisible] = useState(false);
  const pendingApiCall = useApiProgress(
    "delete",
    "/api/1.0/sosses/" + id,
    true
  );

  const onClickDelete = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await deleteSos(id);
      onDeleteSos(id);
    } catch (error) {}
  };

  const onClickCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="card p-1 mb-1">
        <div className="d-flex">
          <ProfileImageWithDefault
            image={image}
            width={32}
            height={32}
            className={"rounded-circle ms-1"}
          />
          <div className="flex-fill m-auto ps-2">
            <Link className="text-secondary" to={"/user/" + username}>
              <h6 className="d-inline">
                {name}@{username}
              </h6>
              <span>-</span>
              <span>{formatted}</span>
            </Link>
          </div>

          {ownedByLoggedInUser && (
            <button
              className="btn btn-delete-link btn-sm"
              onClick={() => {
                setModalVisible(true);
              }}
            >
              <i className="material-icons">delete_outline</i>
            </button>
          )}
        </div>
        <div className="ps-5">{content}</div>
        {fileAttachmentDto && (
          <div className="ps-5">
            {fileAttachmentDto.fileType.startsWith("image") && (
              <img
                className="img-fluid"
                width={210}
                src={"files/attachments/" + fileAttachmentDto.name}
                alt="content"
              ></img>
            )}
            {!fileAttachmentDto.fileType.startsWith("image") && (
              <a href={"files/attachments/" + fileAttachmentDto.name} download>
                {t("Click to Download")}
              </a>
            )}
          </div>
        )}
      </div>
      <Modal
        title={t("Delete Sos")}
        visible={modalVisible}
        onClickCancel={onClickCancel}
        onClickOk={onClickDelete}
        message={
          <div>
            <div>
              <strong>{t("Are you sure to delete Sos?")}</strong>
            </div>
            <span>{content}</span>
          </div>
        }
        pendingApiCall={pendingApiCall}
        okButton={t("Delete Sos")}
      />
    </>
  );
}
