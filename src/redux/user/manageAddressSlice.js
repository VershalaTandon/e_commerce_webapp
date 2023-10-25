import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageAddressService from "../../services/manageAddressService";

// Login
export const getUserAddress = createAsyncThunk(
  "manageAddressService/getUserAddress",
  async (data, { rejectWithValue }) => {
    try {
      const res = await manageAddressService.getUserAddress(data);
      return res;
    } catch (err) {
      const error = rejectWithValue(err.response);
      return error;
    }
  }
);

// Register API
export const saveAddress = createAsyncThunk(
  "manageAddressService/saveAddress",
  async (data, { rejectWithValue }) => {
    try {
      const res = await manageAddressService.saveAddress(data);
      return res;
    } catch (err) {
      const error = rejectWithValue(err.response);
      return error;
    }
  }
);

// Define the initial state using declared type
const initialState = {
  selectedAddress: undefined,
  addressList: {
    addressData: undefined,
    error: undefined,
  },
};

export const shippingAddressSlice = createSlice({
  name: "shippingAddress",
  initialState,
  reducers: {
    setSelectedAddress: (state, { payload }) => {
      state.selectedAddress = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAddress.pending, (state) => {});
    builder.addCase(getUserAddress.fulfilled, (state, action) => {
      state.addressList.addressData = action.payload.data.data;
      state.addressList.error = undefined;
    });
    builder.addCase(getUserAddress.rejected, (state, action) => {
      state.addressList.addressData = undefined;
      state.addressList.error = `Something Went wrong. Please retry. \n ${
        action.payload?.data?.Message ? action.payload?.data?.Message : ""
      }`;
    });

    builder.addCase(saveAddress.pending, (state) => {});
    builder.addCase(saveAddress.fulfilled, (state, action) => {
      state.addressList.addressData = action.payload.data.data;
      state.addressList.error = undefined;
    });
    builder.addCase(saveAddress.rejected, (state, action) => {
      state.addressList.addressData = undefined;
      state.addressList.error = `Something Went wrong. Please retry. \n ${
        action.payload?.data?.Message ? action.payload?.data?.Message : ""
      }`;
    });
  },
});

export default shippingAddressSlice.reducer;
export const { setSelectedAddress } = shippingAddressSlice.actions;
