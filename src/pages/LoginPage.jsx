import React, { Component } from "react";
import "../css/UserSignUpPage.css";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/ApiCalls";

class LoginPage extends Component {
  state = {
    username: null,
    password: null,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onClickLogin=event=>{
    const {username,password}=this.state
    event.preventDefault()
    const creds={
        username,
        password,
    }
    login(creds)
  }

  render() {
    const { t } = this.props;
    return (
      <div className="container">
        <form>
          <h2 className="mt-5 text-center">{t("Login")}</h2>
          <Input label={t("Username")} name="username" onChange={this.onChange} />
          <Input
            type="password"
            label={t("Password")}
            name="password"
            onChange={this.onChange}
          />
          <div className="text-center">
            <button onClick={this.onClickLogin} className="btn btn-primary mt-3">{t("Login")}</button>
          </div>
        </form>
      </div>
    );
  }
}

const LoginPageWithTranslation = withTranslation()(LoginPage);
export default LoginPageWithTranslation;
