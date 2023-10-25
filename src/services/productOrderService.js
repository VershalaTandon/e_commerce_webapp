import { httpRequest } from "./Service";

// Get add to cart list
const getAddToCartProducts = (id) => {
  const url = `shoppingCart/${id}`;
  return httpRequest.get(url);
};

// Save product in add to cart list
const saveProductOrderList = (params) => {
  const url = "shoppingCart";
  return httpRequest.post(url, params);
};

const updateCartCheckoutStatus = (params) => {
  const url = "shoppingCart/checkout";
  return httpRequest.put(url, params);
};

const updateProductInCart = (params) => {
  const url = "shoppingCart/updateCart/";
  return httpRequest.put(url, params);
};

export default {
  getAddToCartProducts,
  saveProductOrderList,
  updateCartCheckoutStatus,
  updateProductInCart,
};
