import axios from "axios";

// API Base URL
const BASE_URL = "http://localhost:3000/";
axios.defaults.baseURL = BASE_URL;
// Set content type
export const jsonConfig = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};

// Axios reuable requests
export const httpRequest = {
  get: (url) =>
    axios.get(url, jsonConfig).then((responseBody) => {
      return responseBody;
    }),
  post: (url, body) =>
    axios.post(url, body, jsonConfig).then((responseBody) => {
      return responseBody;
    }),
  put: (url, body) =>
    axios.put(url, body, jsonConfig).then((responseBody) => {
      return responseBody;
    }),
  del: (url) =>
    axios.delete(url, jsonConfig).then((responseBody) => {
      return responseBody;
    }),
};
