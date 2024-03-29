// @ts-nocheck
import * as axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

//  new code
const _axios = axios.create({ baseURL });

_axios.interceptors.request.use((req) => {
  const apiToken = localStorage.getItem("apiToken");
  if (apiToken) {
    if (req.url === "api/user/verify_identity/") {
      req.headers = {
        "Content-type": "multipart/form-data",
        Authorization: `bearer ${apiToken}`,
      };
    } else {
      req.headers = {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `bearer ${apiToken}`,
      };
    }
  }
  return req;
});

export default _axios as axios;
