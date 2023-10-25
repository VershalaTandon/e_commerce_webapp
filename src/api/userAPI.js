import React from "react";
import {
  deleteLoginData,
  getUserAddress,
  login,
  logout,
  register,
  saveAddress,
  setSelectedAddress,
} from "../redux";
import { jsonConfig } from "../services/Service";
import string from "../constants/string";
import { getAddToCartListAPI } from "./addToCartAPI";

// Login
export const loginApi = async (
  dispatch,
  setLoading,
  params,
  loginData,
  setRegisteredEmailStatus,
  navigate
) => {
  setLoading(true);
  if (loginData) {
    await dispatch(deleteLoginData());
  }

  const loginRes = await dispatch(login(params));
  setLoading(false);
  if (loginRes.payload && loginRes.payload?.data.Success) {
    setRegisteredEmailStatus("Done"); // Email is already registered, login success

    jsonConfig.headers = {
      ...jsonConfig.headers,
      "x-access-token": loginRes.payload?.data?.data.token,
    };

    await getUserAddressData(
      setLoading,
      dispatch,
      loginRes.payload?.data?.data._id
    );
    await getAddToCartListAPI(
      "Login",
      setLoading,
      dispatch,
      loginRes.payload?.data?.data._id
    );

    navigate("/", { replace: true });
  } else if (
    !loginRes.payload?.data.Success &&
    loginRes.payload?.data.Message === string.login.PasswordError
  ) {
    setRegisteredEmailStatus(string.login.Login); // Email is already registered but Password does not match
  } else if (
    !loginRes.payload?.data.Success &&
    loginRes.payload?.data.Message === string.login.EmailError
  ) {
    setRegisteredEmailStatus(string.login.Signup); // Email is not registered
  } else {
    alert(
      `Something Went wrong. Please retry. \n ${
        loginRes.payload?.data?.Message ? loginRes.payload?.data?.Message : ""
      }`
    );
  }
};

// Register
export const registerApi = async (
  setLoading,
  params,
  dispatch,
  setRegisteredEmailStatus,
  navigate
) => {
  setLoading(true);
  const registerRes = await dispatch(register(params));
  setLoading(false);
  if (registerRes.payload && registerRes.payload?.data.Success) {
    setRegisteredEmailStatus("Done"); // Email is already registered, registeration success

    jsonConfig.headers = {
      ...jsonConfig.headers,
      "x-access-token": registerRes.payload?.data?.data.token,
    };

    getUserAddressData(
      setLoading,
      dispatch,
      registerRes.payload?.data?.data._id
    );
    await getAddToCartListAPI(
      "Login",
      setLoading,
      dispatch,
      registerRes.payload?.data?.data._id
    );

    navigate("/", { replace: true });
  } else {
    alert(
      `Something Went wrong. Please retry. \n ${
        registerRes.payload?.data?.Message
          ? registerRes.payload?.data?.Message
          : ""
      }`
    );
  }
};

// Logout
export const logoutApi = async (
  setLoading,
  id,
  dispatch,
  setRegisteredEmailStatus,
  setEmail,
  setName,
  setMobileNo,
  setPassword
) => {
  setLoading(true);
  const params = {
    userId: id,
  };
  const logoutRes = await dispatch(logout(params));
  setLoading(false);
  if (logoutRes.payload && logoutRes.payload?.data.Success) {
    await dispatch(deleteLoginData());
    setRegisteredEmailStatus(null);
    setEmail("");
    setName("");
    setMobileNo("");
    setPassword("");

    jsonConfig.headers = {
      ...jsonConfig.headers,
      "x-access-token": "",
    };

    await dispatch({ type: "RESET" });
  } else {
    alert(
      `Something Went wrong. Please retry. \n ${
        logoutRes.payload?.data?.Message ? logoutRes.payload?.data?.Message : ""
      }`
    );
  }
};

// Get User address list
export const getUserAddressData = async (
  setLoading,
  dispatch,
  id,
  from,
  navigate,
  setAddresasList
) => {
  setLoading(true);
  const addressRes = await dispatch(getUserAddress(id));
  setLoading(false);
  if (addressRes.payload && addressRes.payload?.data.Success) {
    if (addressRes.payload?.data.Message === "Shipping address not found.") {
      if (from === "AddressList") {
        navigate("/addAddress", { replace: true });
      }
    } else {
      // swap default address at 1st index if its at any other position.
      let arr = [...addressRes.payload?.data?.data];
      let defaultSelectedAddress = {};
      if (arr.length > 1) {
        let defaultAddress = arr.find((item) => item.defaultStatus === true);
        let defaultAddressIndex = arr.indexOf(defaultAddress);
        defaultSelectedAddress = arr[defaultAddressIndex];
        if (defaultAddressIndex !== 0) {
          let returnFromSplice = arr.splice(defaultAddressIndex, 1, arr[0])[0];
          arr[0] = returnFromSplice;
        }
      } else {
        defaultSelectedAddress = arr[0];
      }
      if (from === "AddressList") {
        setAddresasList(arr);
      }
      await dispatch(setSelectedAddress(defaultSelectedAddress));
    }
  } else {
    alert(
      `Something Went wrong. Please retry. \n ${
        addressRes.payload?.data?.Message
          ? addressRes.payload?.data?.Message
          : ""
      }`
    );
  }
};

export const saveAddressAPI = async (
  setLoading,
  dispatch,
  params,
  state,
  navigate
) => {
  setLoading(true);
  const saveAddressRes = await dispatch(saveAddress(params));
  setLoading(false);
  if (saveAddressRes.payload && saveAddressRes.payload?.data.Success) {
    if (state) {
      await dispatch(setSelectedAddress(saveAddressRes.payload?.data?.data));
      navigate("/cart", { replace: true });
    } else {
      navigate("/addressList", { replace: true });
    }
  } else {
    alert(
      `Something Went wrong. Please retry. \n ${
        saveAddressRes.payload?.data?.Message
          ? saveAddressRes.payload?.data?.Message
          : ""
      }`
    );
  }
};
