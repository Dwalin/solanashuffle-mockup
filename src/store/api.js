/* eslint-disable no-unused-vars */
import axios from "axios";

const isServer = !process.browser;

const serverURL = process.env.SERVER || 'http://localhost:3000/api';

const baseURL = isServer ? serverURL : '/api';


const api = axios.create({
  baseURL,
  withCredentials: true,
  maxRedirects: 1,
  timeout: 60000,
});

api.interceptors.response.use(
  response => {
    if (api?.interceptors?.request?.handlers) {
      try { api.interceptors.request.handlers = []; } catch (e) {
        console.log("Error ejecting handler");
        console.log(e);
      }
    }
    return response;
  },
  error => {
    if (api?.interceptors?.request?.handlers) {
      try { api.interceptors.request.handlers = []; } catch (e) {
        console.log("Error ejecting handler");
        console.log(e);
      }
    }

    let errorData = error;
    if (error.response && [401, 403].includes(error.response.status)) {
      if (typeof localStorage !== 'undefined') {

      }
    }

    return Promise.reject(errorData);
  },
);

let apiExport = {
  client: api,
  loadLeaderBoard: async (data) => (await api.post('/leaderboard/loadLeaderBoard', data)).data,
}

export default apiExport;
