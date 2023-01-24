import axios from "axios";

export const signUp = (body) => {
  return axios.post("/api/1.0/users", body);
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};

export const login = (creds) => {
  return axios.post("/api/1.0/auth", {}, { auth: creds });
};

export const getUsers = (page = 0, size = 3) => {
  return axios.get("/api/1.0/users?page=" + page + "&size=" + size);
};

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
  if (isLoggedIn) {
    const authorizationHeaderValue = "Basic " + btoa(username + ":" + password);
    axios.defaults.headers["Authorization"] = authorizationHeaderValue;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};

export const getUser = (username) => {
  return axios.get("/api/1.0/users/" + username);
};

export const updateUser = (username, body) => {
  return axios.put("/api/1.0/users/" + username, body);
};

export const postSos = (sos) => {
  return axios.post("/api/1.0/sosses", sos);
};

export const getSosses = (username, page = 0) => {
  const path = username
    ? "/api/1.0/users/" + username + "/sosses?page=" + page
    : "/api/1.0/sosses?page=" + page;
  return axios.get(path);
};

export const getOldSosses = (id, username) => {
  const path = username
    ? "/api/1.0/users/" + username + "/sosses/" + id
    : "/api/1.0/sosses/" + id;
  return axios.get(path);
};

export const getNewSosCount=(id,username)=>{
  const path=username?(`/api/1.0/users/${username}/sosses/${id}?count=true`):(`/api/1.0/sosses/${id}?count=true`)
  return axios.get(path)
}

export const getNewSosses=(id,username)=>{
  const path=username?(`/api/1.0/users/${username}/sosses/${id}?direction=after`):`/api/1.0/sosses/${id}?direction=after`
  return axios.get(path)
}