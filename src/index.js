import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./bootstrap-override.scss";
import "./i18n";
import App from "./container/App";
import configureStore from "./redux/configureStore";
import { Provider } from "react-redux";




const store = configureStore()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App></App>
  </Provider>
);

reportWebVitals();
