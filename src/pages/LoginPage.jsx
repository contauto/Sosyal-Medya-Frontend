import "../css/UserSignUpPage.css";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { loginHandler } from "../redux/authActions.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async (event) => {
    event.preventDefault();
    setError(undefined);
    const creds = {
      username,
      password,
    };
    try {
      await dispatch(loginHandler(creds));
      navigate("/");
    } catch (apiError) {
      setError(apiError.response.data.message);
    }
  };

  const { t } = useTranslation();
  const pendingApiCall = useApiProgress("post", "/api/1.0/auth");
  const buttonDisabled = !(username && password);

  return (
    <div className="container">
      <form>
        <h1 className="mt-5 text-center purp">{t("Login")}</h1>
        <Input
          label={t("Username")}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          type="password"
          label={t("Password")}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && <div className="alert alert-danger mt-2">{error}</div>}
        <div className="text-center">
          <ButtonWithProgress
            disabled={buttonDisabled || pendingApiCall}
            onClick={onClickLogin}
            pendingApiCall={pendingApiCall}
            text={t("Login")}
          />
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
