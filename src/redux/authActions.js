import { login, signUp } from "../api/ApiCalls";
import * as ACTIONS from "./Constants";

export const logoutSuccess = () => {
  return { type: ACTIONS.LOGOUT_SUCCESS };
};

export const loginSuccess = (authState) => {
  return { type: ACTIONS.LOGIN_SUCCESS, payload: authState };
};

export const loginHandler = (creds) => {
  return async function (dispatch) {
    const response = await login(creds);

    const authState = {
      ...response.data,
      password: creds.password,
    };
    dispatch(loginSuccess(authState));
    return response
  };
};


export const signUpHandler=(user)=>{
return async function(dispatch){
  const response=await signUp(user)
  await dispatch(loginHandler(user))
  return response
}
}