import React, { Component } from "react";
import { signUp } from "../api/ApiCalls";
import "../css/UserSignUpPage.css"

export default class UserSignUpPage extends Component {
  state = {
    username: null,
    name: null,
    password: null,
    rePassword: null,
    pendingRequest: false,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onClick = async event => {
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
      // eslint-disable-next-line no-unused-vars
      const response = await signUp(body);
    } catch (error) {
      
    }
    this.setState({
      pendingRequest:false,
    })
  };

  render() {
    const {pendingRequest}=this.state
    return (
      <div className="container">
        <form>
          <h1 className="text-center mt-5 purp">Sign Up</h1>

          <div className="form-group mt-2">
            <label>Username</label>
            <input
              className="form-control"
              name="username"
              onChange={this.onChange}
            />
          </div>

          <div className="form-group mt-2">
            <label>Name</label>
            <input
              className="form-control"
              name="name"
              onChange={this.onChange}
            />
          </div>

          <div className="form-group mt-2">
            <label>Password</label>
            <input
              className="form-control"
              name="password"
              onChange={this.onChange}
              type="password"
            />
          </div>

          <div className="form-group mt-2">
            <label>Re-Password</label>
            <input
              className="form-control"
              name="rePassword"
              onChange={this.onChange}
              type="password"
            />
          </div>

          <div className="text-center form-group mt-2">
            <button
              disabled={pendingRequest}
              className="btn btn-primary mt-2"
              onClick={this.onClick}
            >
                {pendingRequest &&
              <span
                className="spinner-border spinner-border-sm"
              ></span>}
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
