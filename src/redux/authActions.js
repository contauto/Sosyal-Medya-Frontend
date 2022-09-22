export const logoutSuccess = () => {
 return {type: "logout-success"}
};


export const loginSuccess=(authState)=>{
   return{type:"login-success",
    payload:authState}
}