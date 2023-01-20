import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { logoutSuccess} from "../redux/authActions";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { useRef, useState, useEffect } from "react";


const Navbar = (props) => {
  const { t } = useTranslation();
  const { username, isLoggedIn, name, image } = useSelector((store) => ({
    name: store.name,
    image: store.image,
    isLoggedIn: store.isLoggedIn,
    username: store.username,
  }));

  const menuArea=useRef(null)
  const [menuVisible,setMenuVisible]=useState(false)

  useEffect(()=>{
    document.addEventListener("click",menuClickTracker)
    return ()=>{
      document.removeEventListener("click",menuClickTracker)
    }
  },[isLoggedIn])

  const menuClickTracker = event =>{
    if(menuArea.current===null || !menuArea.current.contains(event.target)){
      setMenuVisible(false)
    }
  }

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
    let dropDownClass="p-0 shadow dropdown-menu "
    if(menuVisible){
      dropDownClass+="show"
    }
    links = (
      <ul className="navbar-nav ms-auto" ref={menuArea}>
        <li className="nav-item dropdown">
          <div className="d-flex" style={{ cursor: "pointer" }} onClick={()=>{setMenuVisible(true)}}>
            <ProfileImageWithDefault
              image={image}
              className={"rounded-circle m-auto"}
              height={32}
              width={32}
            />
            <span className="nav-link dropdown-toggle">{name}</span>
          </div>
        <div className={dropDownClass}>
        <Link className="dropdown-item d-flex p-2" to={`/user/${username}`} onClick={()=>{setMenuVisible(false)}}>
        <i className="material-icons text-info me-1">person</i>
              {t('My Profile')}
      </Link>
      <span
        onClick={onLogOutSuccess}
        style={{ cursor: "pointer" }}
        className="dropdown-item d-flex p-2"
      >
        <i className="material-icons text-danger me-1">power_settings_new</i>
              {t('Logout')}
      </span>



        </div>
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
