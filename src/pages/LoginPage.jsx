import React, { Component } from "react";
import "../css/UserSignUpPage.css";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/ApiCalls";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { withRouter } from "../shared/withRouter";
import { connect } from "react-redux";
import { loginSuccess } from "../redux/authActions";

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
    const creds = {
      username,
      password,
    };
    this.setState({
      error: null,
    });
    try {
      const response = await login(creds);
      this.props.navigate("/");
      const authState = {
        ...response.data,
        password,
      }
      this.props.onLoginSuccess(authState);
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
const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSuccess: (authState) => {
     return dispatch(loginSuccess(authState));
    },
  };
};

const LoginPageWithTranslation = withTranslation()(LoginPage);
const LoginPageWithApiProgress = withApiProgress(
  LoginPageWithTranslation,
  "/api/1.0/auth"
);
export default connect(
  null,
  mapDispatchToProps
)(withRouter(LoginPageWithApiProgress));
