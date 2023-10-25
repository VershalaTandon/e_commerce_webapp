import { httpRequest } from "./Service";

// Login API
const getUserAddress = (id) => {
  const url = `shippingAddress/${id}`;
  return httpRequest.get(url);
};

// Register API
const saveAddress = (params) => {
  const url = "shippingAddress";
  return httpRequest.post(url, params);
};

export default { getUserAddress, saveAddress };
