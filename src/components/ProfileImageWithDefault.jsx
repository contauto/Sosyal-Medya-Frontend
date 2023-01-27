import React from "react";
import defaultPicture from "../assets/profile.png";

export default function ProfileImageWithDefault(props) {
  let imageSource = defaultPicture;
  const { image } = props;

  if (image) {
    imageSource = "files/profile-photo/" + image;
  }

  return <img alt={"profile"} src={imageSource} {...props}></img>;
}
