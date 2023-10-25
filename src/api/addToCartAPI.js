import React from "react";
import {
  getAddToCartProducts,
  saveProductOrderList,
  updateCartCheckoutStatus,
  updateProductInCart,
} from "../redux";

// Get Cart data
export const getAddToCartListAPI = async (
  from,
  setLoading,
  dispatch,
  id,
  setAddToCartList
) => {
  setLoading(true);
  const addToCartRes = await dispatch(getAddToCartProducts(id));
  setLoading(false);
  if (addToCartRes.payload && addToCartRes.payload?.data.Success) {
    if (addToCartRes.payload?.data?.Message === "Empty cart.") {
      if (from === "Cart") {
        setAddToCartList(undefined);
      }
    } else {
      if (from === "Cart") {
        setAddToCartList(addToCartRes.payload?.data?.data);
      }
    }
  } else {
    alert(
      `Something Went wrong. Please retry. \n ${
        addToCartRes.payload?.data?.Message
          ? addToCartRes.payload?.data?.Message
          : ""
      }`
    );
  }
};

// Create cart and add product to cart
export const addToCartAPI = async (
  setLoading,
  dispatch,
  params,
  setAddToCartStatus
) => {
  setLoading(true);
  const addToCartRes = await dispatch(saveProductOrderList(params));
  console.log("addToCartRes", addToCartRes);
  setLoading(false);
  if (addToCartRes.payload && addToCartRes.payload?.data.Success) {
    if (
      addToCartRes.payload?.data?.Message ===
      "Cart data already exists for this user. Please execute put api to update the cart data."
    ) {
      // call update cart api
      updateCartDataAPI(setLoading, dispatch, params);
    }
    setAddToCartStatus(true);
  } else {
    alert(
      `Something Went wrong. Please retry. \n ${
        addToCartRes.payload?.data?.Message
          ? addToCartRes.payload?.data?.Message
          : ""
      }`
    );
  }
};

// Update cart -> add new product or update existing product count
export const updateCartDataAPI = async (
  setLoading,
  dispatch,
  params,
  from,
  setAddToCartList
) => {
  setLoading(true);
  const updateCartRes = await dispatch(updateProductInCart(params));
  setLoading(false);
  if (updateCartRes.payload && updateCartRes.payload?.data.Success) {
    if (from === "Cart") {
      setAddToCartList(updateCartRes.payload?.data.data);
    }
  } else {
    alert(
      `Something Went wrong. Please retry. \n ${
        updateCartRes.payload?.data?.Message
          ? updateCartRes.payload?.data?.Message
          : ""
      }`
    );
  }
};

// Place an order - update cart status from pending to confirmed
export const placeOrderAPI = async (id, setLoading, dispatch, navigate) => {
  const params = {
    userId: id,
    orderStatus: "Confirmed",
  };

  setLoading(true);
  const orderPlacedRes = await dispatch(updateCartCheckoutStatus(params));
  console.log("orderPlacedRes", orderPlacedRes);
  setLoading(false);
  if (orderPlacedRes.payload && orderPlacedRes.payload?.data.Success) {
    alert("Order Placed successfully.");
    navigate("/", {
      replace: true,
    });
  } else {
    alert(
      `Something Went wrong. Please retry. \n ${
        orderPlacedRes.payload?.data?.Message
          ? orderPlacedRes.payload?.data?.Message
          : ""
      }`
    );
  }
};
