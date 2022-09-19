import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

class Navbar extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="shadow-sm bg-light mb-2">
        <nav className="navbar navbar-light container navbar-expand">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="logo" width={64} />
            Sosio
          </Link>
          <ul className="navbar-nav ms-auto">
            <li>
              <Link to="/login" className="nav-link purp">
                {t("Login")}
              </Link>
            </li>
            <li>
              <Link to="/signup" className="nav-link purp">
                {t("Sign Up")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default withTranslation()(Navbar);
