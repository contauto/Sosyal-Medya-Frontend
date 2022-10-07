import React from "react";
import UserSignUpPage from "../pages/UserSignUpPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import Navbar from "../components/Navbar";
import LanguageSelector from "../components/LanguageSelector";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

 const App=props=>{

const {isLoggedIn}=useSelector((store)=>({
  isLoggedIn:store.isLoggedIn
}))

 
    return (
      <div>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            {!isLoggedIn && <Route path="/login" element={<LoginPage />} />}
            <Route path="/signup" element={<UserSignUpPage />} />
            <Route path="/user/:username" element={<UserPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
        <LanguageSelector />
      </div>
    );
}


export default App;
