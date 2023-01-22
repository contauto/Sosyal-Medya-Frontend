import React, { useEffect, useState } from "react";
import ProfileImageWithDefault from "../components/ProfileImageWithDefault";
import { useTranslation } from "react-i18next";
import Input from "../components/Input";
import { updateUser } from "../api/ApiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSuccess } from "../redux/authActions";

const ProfileCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const { username, name, image } = user;
  const { t } = useTranslation();
  const [updatedName, setUpdatedName] = useState();
  const pathUsername = useParams().username;
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));
  const [editable, setEditable] = useState(false);
  const [newImage, setNewImage] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  useEffect(() => {
    setEditable(pathUsername === loggedInUsername);
  }, [pathUsername, loggedInUsername]);

  const onClickSave = async () => {
    let image;
    let propsName = name;
    if (updatedName) {
      propsName = updatedName;
    }
    if (newImage) {
      image = newImage.split(",")[1];
    }

    const body = {
      name: propsName,
      image,
    };
    try {
      const response = await updateUser(username, body);
      setEditMode(false);
      setUser(response.data);
      dispatch(updateSuccess(response.data));
    } catch (error) {
      setValidationErrors(error.response.data.validationErrors);
    }
  };

  const pendingApiCall = useApiProgress("put", "/api/1.0/users/" + username);

  const onChangeFile = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setNewImage(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    } else {
      setNewImage(undefined);
    }
  };

  useEffect(() => {
    setValidationErrors((previousValidationErrors) => ({
      ...previousValidationErrors,
      name: undefined,
    }));
  }, [updatedName]);

  useEffect(() => {
    setValidationErrors((previousValidationErrors) => ({
      ...previousValidationErrors,
      image: undefined,
    }));
  }, [newImage]);

  const { name: nameError, image: imageError } = validationErrors || {};

  return (
    <div className="card text-center">
      <div className="card-header">
        <ProfileImageWithDefault
          className="rounded-circle shadow"
          width={200}
          height={200}
          alt={username + " profile"}
          image={image}
        ></ProfileImageWithDefault>
      </div>

      <div className="card-body">
        {!editMode && (
          <div>
            <h3>
              {name}@{username}
            </h3>

            {editable && (
              <>
                <button
                  onClick={() => setEditMode(true)}
                  className="btn btn-warning d-inline-flex"
                >
                  <i className="material-icons">edit</i>
                  {t("Edit")}
                </button>
              </>
            )}
          </div>
        )}

        {editMode && (
          <div className="container">
            <Input
              onChange={(e) => {
                setUpdatedName(e.target.value);
              }}
              error={nameError}
              defaultValue={name}
              label={t("Change Name")}
            ></Input>

            <div className="mb-3 mt-3 text-center">
              <Input
                error={imageError}
                accept="image/*"
                onChange={onChangeFile}
                type="file"
                className="form-control"
                label={t("Change Image")}
              />
            </div>

            <div className="mt-3">
              <ButtonWithProgress
                onClick={onClickSave}
                className="btn btn-success d-inline-flex"
                disabled={pendingApiCall}
                pendingApiCall={pendingApiCall}
                text={
                  <>
                    <i className="material-icons">save</i>
                    {t("Save")}
                  </>
                }
              ></ButtonWithProgress>
              <button
                className="btn btn-danger d-inline-flex ms-2"
                disabled={pendingApiCall}
                onClick={() => {
                  setEditMode(false);
                  setUpdatedName(name);
                  setNewImage(undefined);
                }}
              >
                <i className="material-icons">close</i>
                {t("Cancel")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
