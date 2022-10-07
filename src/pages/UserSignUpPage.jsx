import "../css/UserSignUpPage.css";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useApiProgress} from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { signUpHandler } from "../redux/authActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserSignUpPage = (props) => {
  const [form, setForm] = useState({
    username: null,
    name: null,
    password: null,
    rePassword: null,
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const onChange = (event) => {
    const { name, value } = event.target;
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const onClickSignUp = async (event) => {
    event.preventDefault();

    const { username, name, password } = form;
    const body = {
      username,
      name,
      password,
    };
    try {
      await dispatch(signUpHandler(body));
      navigate("/");
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  const {
    username: usernameError,
    name: nameError,
    password: passwordError,
  } = errors;
  const pendingApiCallForSignUp=useApiProgress("/api/1.0/users")
  const pendingApiCallForLogin=useApiProgress("/api/1.0/auth")
  const pendingApiCall=pendingApiCallForLogin||pendingApiCallForSignUp
  const { t } = useTranslation();

  let rePasswordError;
  if (form.rePassword !== form.password) {
    rePasswordError = t("Password mismatch");
  }
  return (
    <div className="container">
      <form>
        <h1 className="text-center mt-5 purp">{t("Sign Up")}</h1>
        <Input
          name="username"
          onChange={onChange}
          label={t("Username")}
          error={usernameError}
        />
        <Input
          name="name"
          onChange={onChange}
          label={t("Name")}
          error={nameError}
        />
        <Input
          name="password"
          onChange={onChange}
          label={t("Password")}
          error={passwordError}
          type="password"
        />
        <Input
          name="rePassword"
          onChange={onChange}
          label={t("Re-Password")}
          error={rePasswordError}
          type="password"
        />
        <div className="text-center form-group mt-2">
          <ButtonWithProgress
            disabled={pendingApiCall || rePasswordError !== undefined}
            onClick={onClickSignUp}
            pendingApiCall={pendingApiCall}
            text={t("Sign Up")}
          />
        </div>
      </form>
    </div>
  );
};


export default UserSignUpPage;
