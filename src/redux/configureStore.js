import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import SecureLS from "secure-ls";
import authReducer from "./authReducer";

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
  
  const store = createStore(
    authReducer,
    getStateFromStorage(),
    applyMiddleware(thunk)
  );

  store.subscribe(() => {
    updateStateInStorage(store.getState())
  });

  return store;
};

export default configureStore;
