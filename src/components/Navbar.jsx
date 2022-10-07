import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { logoutSuccess } from "../redux/authActions";

const Navbar = (props) => {
  const { t } = useTranslation();
  const { username, isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
  }));

  const dispatch = useDispatch();

  const onLogOutSuccess = () => {
    dispatch(logoutSuccess());
  };

  let links = (
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
  );

  if (isLoggedIn) {
    links = (
      <ul className="navbar-nav ms-auto">
        <li>
          <Link className="nav-link" to={`/user/${username}`}>
            {username}
          </Link>
        </li>
        <li
          onClick={onLogOutSuccess}
          style={{ cursor: "pointer" }}
          className="nav-link"
        >
          {t("Logout")}
        </li>
      </ul>
    );
  }

  return (
    <div className="shadow-sm bg-light mb-2">
      <nav className="navbar navbar-light container navbar-expand">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" width={64} />
          Sosio
        </Link>
        {links}
      </nav>
    </div>
  );
};

export default Navbar;
