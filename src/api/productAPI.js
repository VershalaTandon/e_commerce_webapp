import React from "react";
import { getProductCategoryList, getProductList } from "../redux";

// Get category list api
export const getCategoryListAPI = async (dispatch, setCategories, setError) => {
  const categoryRes = await dispatch(getProductCategoryList());
  if (categoryRes.payload && categoryRes.payload?.data.Success) {
    setCategories(categoryRes.payload?.data?.data);
  } else {
    setError(categoryRes.payload?.data?.Message);
  }
};

// Get product list api
export const getProductsAPI = async (
  dispatch,
  setLoading,
  setProducts,
  setError
) => {
  const productsRes = await dispatch(getProductList());
  setLoading(false);
  if (productsRes.payload && productsRes.payload?.data.Success) {
    setProducts(productsRes.payload?.data?.data);
  } else {
    setError(productsRes.payload?.data?.Message);
  }
};
