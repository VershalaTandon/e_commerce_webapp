import { httpRequest } from "./Service";

// Get Product Category List API
const getProductCategoryList = () => {
  const url = "category";
  return httpRequest.get(url);
};

// Get Product List API
const getProductList = () => {
  const url = "product";
  return httpRequest.get(url);
};

export default { getProductCategoryList, getProductList };
