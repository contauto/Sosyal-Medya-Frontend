/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { signUp } from "../api/ApiCalls";
import "../css/UserSignUpPage.css";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";

class UserSignUpPage extends Component {
  state = {
    username: null,
    name: null,
    password: null,
    rePassword: null,
    errors: {},
  };

  onChange = (event) => {
    const { t } = this.props;
    const { name, value } = event.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    if (name === "password" || name === "rePassword") {
      if (name === "password" && value !== this.state.rePassword) {
        errors.rePassword = t("Password mismatch");
      } else if (name === "rePassword" && value !== this.state.password) {
        errors.rePassword = t("Password mismatch");
      } else {
        errors.rePassword = undefined;
      }
    }
    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSignUp = async (event) => {
    event.preventDefault();

    const { username, name, password } = this.state;

    const body = {
      username,
      name,
      password,
    };
    try {
      const response = await signUp(body);
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({
          errors: error.response.data.validationErrors,
        });
      }
    }
  };

  render() {
    const { errors } = this.state;
    const { username, name, password, rePassword } = errors;
    const { t, pendingApiCall } = this.props;
    return (
      <div className="container">
        <form>
          <h1 className="text-center mt-5 purp">{t("Sign Up")}</h1>
          <Input
            name="username"
            onChange={this.onChange}
            label={t("Username")}
            error={username}
          />
          <Input
            name="name"
            onChange={this.onChange}
            label={t("Name")}
            error={name}
          />
          <Input
            name="password"
            onChange={this.onChange}
            label={t("Password")}
            error={password}
            type="password"
          />
          <Input
            name="rePassword"
            onChange={this.onChange}
            label={t("Re-Password")}
            error={rePassword}
            type="password"
          />
          <div className="text-center form-group mt-2">
            <ButtonWithProgress
              disabled={pendingApiCall || rePassword !== undefined}
              onClick={this.onClickSignUp}
              pendingApiCall={pendingApiCall}
              text={t("Sign Up")}
            />
          </div>
        </form>
      </div>
    );
  }
}

const UserSignUpPageWithApiProgress = withApiProgress(
  UserSignUpPage,
  "/api/1.0/users"
);
const UserSignUpPageWithTranslation = withTranslation()(
  UserSignUpPageWithApiProgress
);

export default UserSignUpPageWithTranslation;
