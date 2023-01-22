import React from "react";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useTranslation } from "react-i18next";

export default function SosView(props) {
  const { sos } = props;
  const { userDto, content, timestamp } = sos;
  const { name, username, image } = userDto;
  const { i18n } = useTranslation();
  const formatted = format(timestamp, i18n.language);

  return (
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
      </div>
      <div className="ps-5">{content}</div>
    </div>
  );
}
