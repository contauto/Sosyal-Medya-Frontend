import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import SecureLS from "secure-ls";
import authReducer from "./authReducer";
import { setAuthorizationHeader } from "../api/ApiCalls";

const secureLS=new SecureLS();

let getStateFromStorage=()=>{
  const sosioAuth = secureLS.get("sosio-auth");
  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    name: undefined,
    image: undefined,
    password: undefined,
  };
  if (sosioAuth) {
  return sosioAuth
}
return stateInLocalStorage}

const updateStateInStorage=(newState)=>{
  secureLS.set("sosio-auth",newState);
}



const configureStore = () => {
  const initialState=getStateFromStorage()
  setAuthorizationHeader(initialState)
  const store = createStore(
    authReducer,
    initialState,
    applyMiddleware(thunk)
  );

  store.subscribe(() => {
    updateStateInStorage(store.getState())
    setAuthorizationHeader(store.getState())
  });

  return store;
};

export default configureStore;
