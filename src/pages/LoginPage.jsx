import React, { Component } from "react";
import "../css/UserSignUpPage.css";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/ApiCalls";
import axios from "axios";
import ButtonWithProgress from "../components/ButtonWithProgress";

class LoginPage extends Component {
  state = {
    username: null,
    password: null,
    error: null,
    pendingApiCall:false,
  };


  componentDidMount(){
    axios.interceptors.request.use((request)=>{
      this.setState({
        pendingApiCall:true,
      })
return request
    })

    axios.interceptors.response.use(response=>{
      this.setState({
        pendingApiCall:false,
      })
      return response
    },(error)=>{
      this.setState({
        pendingApiCall:false,
      })
      throw error
    })

  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error:null,
    });
  };

  onClickLogin = async (event) => {
    const { username, password } = this.state;
    event.preventDefault();
    const creds = {
      username,
      password,
    };
    this.setState({
      error:null
    })
    try {
      await login(creds);
    } catch (apiError) {
      this.setState({ error: apiError.response.data.message });
    }
  };

  render() {
    const { t } = this.props;
    const {username,password,error,pendingApiCall}=this.state
    const buttonDisabled=!(username&&password)
    return (
      <div className="container">
        <form>
          <h2 className="mt-5 text-center">{t("Login")}</h2>
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

          {error && <div className="alert alert-danger mt-2">
           {error}
          </div>}
          <div className="text-center">
            <ButtonWithProgress disabled={buttonDisabled||pendingApiCall}
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
export default LoginPageWithTranslation;
