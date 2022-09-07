import React, { Component } from "react";
import axios from "axios";

export default class UserSignUpPage extends Component {
  state = {
    username: null,
    name: null,
    password: null,
    rePassword: null,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onClick = (event) => {
    event.preventDefault();

    const { username, name, password } = this.state;

    const body = {
      username,
      name,
      password,
    };
    axios.post("/api/1.0/users", body);
  };

  render() {
    return (
      <div className="container">
        <form>
          <h1 className="text-center">Sign Up</h1>

          <div className="form-group">
            <label>Username</label>
            <input
              className="form-control"
              name="username"
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              name="name"
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              name="password"
              onChange={this.onChange}
              type="password"
            />
          </div>

          <div className="form-group">
            <label>Re-Password</label>
            <input
              className="form-control"
              name="rePassword"
              onChange={this.onChange}
              type="password"
            />
          </div>

          <div className="text-center">
            <button className="btn btn-primary mt-2" onClick={this.onClick}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
