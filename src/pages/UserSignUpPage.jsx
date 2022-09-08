/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { signUp } from "../api/ApiCalls";
import "../css/UserSignUpPage.css";
import Input from "../components/Input";

export default class UserSignUpPage extends Component {
  state = {
    username: null,
    name: null,
    password: null,
    rePassword: null,
    pendingRequest: false,
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    this.setState({
      [name]: value,
      errors,
    });
  };

  onClick = async (event) => {
    event.preventDefault();

    const { username, name, password } = this.state;

    const body = {
      username,
      name,
      password,
    };
    this.setState({
      pendingRequest: true,
    });
    try {
      const response = await signUp(body);
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({
          errors: error.response.data.validationErrors,
        });
      }
    }
    this.setState({
      pendingRequest: false,
    });
  };

  render() {
    const { pendingRequest, errors } = this.state;
    const { username,name,password,rePassword } = errors;
    return (
      <div className="container">
        <form>
          <h1 className="text-center mt-5 purp">Sign Up</h1>
          <Input name="username" onChange={this.onChange} label="Username" error={username}/>
          <Input name="name" onChange={this.onChange} label="Name" error={name}/>
          <Input name="password" onChange={this.onChange} label="Password" error={password}/>
          <Input name="rePassword" onChange={this.onChange} label="Re-Password" error={rePassword}/>
          <div className="text-center form-group mt-2">
            <button
              disabled={pendingRequest}
              className="btn btn-primary mt-2"
              onClick={this.onClick}
            >
              {pendingRequest && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
