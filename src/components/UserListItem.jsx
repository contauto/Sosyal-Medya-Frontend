import React from "react";
import { Link } from "react-router-dom";
import ProfileImageWithDefault from "../components/ProfileImageWithDefault";

export default function UserListItem(props) {
  const { user } = props;
  const { username, name, image } = user;

  return (
    <Link
      to={"/user/" + username}
      className="list-group-item list-group-item-action"
    >
      <ProfileImageWithDefault
        className="rounded-circle ms-1 mt-1"
        width={32}
        height={32}
        alt={user.username + "'s profile picture"}
        image={image}
      ></ProfileImageWithDefault>
      <span className="ps-1">
        {name}@{username}
      </span>
    </Link>
  );
}
