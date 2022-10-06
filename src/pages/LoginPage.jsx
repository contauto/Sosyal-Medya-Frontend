import React, { Component } from "react";
import "../css/UserSignUpPage.css";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { withRouter } from "../shared/withRouter";
import { connect } from "react-redux";
import { loginHandler } from "../redux/authActions.js";
class LoginPage extends Component {
  state = {
    username: null,
    password: null,
    error: null,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: null,
    });
  };

  onClickLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { dispatch } = this.props;
    const creds = {
      username,
      password,
    };
    this.setState({
      error: null,
    });
    try {
     await dispatch(loginHandler(creds))
      this.props.navigate("/");
    } catch (apiError) {
      this.setState({ error: apiError.response.data.message });
    }
  };

  render() {
    const { t, pendingApiCall } = this.props;
    const { username, password, error } = this.state;
    const buttonDisabled = !(username && password);
    return (
      <div className="container">
        <form>
          <h1 className="mt-5 text-center purp">{t("Login")}</h1>
          <Input
            label={t("Username")}
            name="username"
            onChange={this.onChange}
          />
          <Input
            type="password"
            label={t("Password")}
            name="password"
            onChange={this.onChange}
          />

          {error && <div className="alert alert-danger mt-2">{error}</div>}
          <div className="text-center">
            <ButtonWithProgress
              disabled={buttonDisabled || pendingApiCall}
              onClick={this.onClickLogin}
              pendingApiCall={pendingApiCall}
              text={t("Login")}
            />
          </div>
        </form>
      </div>
    );
  }
}

const LoginPageWithTranslation = withTranslation()(LoginPage);
const LoginPageWithApiProgress = withApiProgress(
  LoginPageWithTranslation,
  "/api/1.0/auth"
);
export default connect()(withRouter(LoginPageWithApiProgress));
