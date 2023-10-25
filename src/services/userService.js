import { httpRequest } from "./Service";

// Login API
const login = (params) => {
  const url = "users/login";
  return httpRequest.post(url, params);
};

// Register API
const register = (params) => {
  const url = "users/register";
  return httpRequest.post(url, params);
};

// Logout API
const logout = (params) => {
  const url = "users/logout";
  return httpRequest.put(url, params);
};

export default { login, register, logout };
