import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./bootstrap-override.scss";
import "./i18n";
import App from "./container/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App></App>);

reportWebVitals();
