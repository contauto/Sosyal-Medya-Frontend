import React, { useState } from "react";
import ProfileImageWithDefault from "../components/ProfileImageWithDefault";
import { useTranslation } from "react-i18next";
import Input from "../components/Input";
const ProfileCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const { user } = props;
  const { username, name, image } = user;
  const { t } = useTranslation();
  const [updatedDisplayName, setUpdatedDisplayName] = useState();
  const onClickSave = () => {
    console.log(updatedDisplayName);
  };
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

            <button
              onClick={() => setEditMode(true)}
              className="btn btn-warning d-inline-flex"
            >
              <i className="material-icons">edit</i>Edit
            </button>
          </div>
        )}

        {editMode && (
          <div className="container">
            <Input onChange={e=>{setUpdatedDisplayName(e.target.value)}} defaultValue={name} label={t("Change Name")}></Input>
            <div className="mt-2">
              <button onClick={onClickSave} className="btn btn-success d-inline-flex">
                <i className="material-icons">save</i>
                {t("Save")}
              </button>
              <button
                className="btn btn-danger d-inline-flex ms-2"
                onClick={() => {setEditMode(false)
                  setUpdatedDisplayName(name)}
                }
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
