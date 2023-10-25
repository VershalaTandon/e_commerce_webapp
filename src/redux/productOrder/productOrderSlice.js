import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productOrderService from "../../services/productOrderService";

// Add to cart list
export const getAddToCartProducts = createAsyncThunk(
  "productOrderService/getAddToCartProducts",
  async (data, { rejectWithValue }) => {
    try {
      const res = await productOrderService.getAddToCartProducts(data);
      return res;
    } catch (err) {
      const error = rejectWithValue(err.response);
      return error;
    }
  }
);

// Save product in add to cart list
export const saveProductOrderList = createAsyncThunk(
  "productOrderService/getProductList",
  async (data, { rejectWithValue }) => {
    try {
      const res = await productOrderService.saveProductOrderList(data);
      return res;
    } catch (err) {
      const error = rejectWithValue(err.response);
      return error;
    }
  }
);

// Update checkout status
export const updateCartCheckoutStatus = createAsyncThunk(
  "productOrderService/updateCartCheckoutStatus",
  async (data, { rejectWithValue }) => {
    try {
      const res = await productOrderService.updateCartCheckoutStatus(data);
      return res;
    } catch (err) {
      const error = rejectWithValue(err.response);
      return error;
    }
  }
);

// Update cart -> Add prodcut to the existing cart
export const updateProductInCart = createAsyncThunk(
  "productOrderService/updateProductInCart",
  async (data, { rejectWithValue }) => {
    try {
      const res = await productOrderService.updateProductInCart(data);
      return res;
    } catch (err) {
      const error = rejectWithValue(err.response);
      return error;
    }
  }
);

// Define the initial state using declared type
const initialState = {
  addToCart: {
    data: undefined,
    error: undefined,
  },
};

export const productOrderSlice = createSlice({
  name: "productsOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAddToCartProducts.pending, (state) => {});
    builder.addCase(getAddToCartProducts.fulfilled, (state, action) => {
      state.addToCart.data = action.payload.data.data;
      state.addToCart.error = undefined;
    });
    builder.addCase(getAddToCartProducts.rejected, (state, action) => {
      state.addToCart.data = undefined;
      state.addToCart.error = `Something Went wrong. Please retry. \n ${
        action.payload?.data?.Message ? action.payload?.data?.Message : ""
      }`;
    });

    builder.addCase(saveProductOrderList.pending, (state) => {});
    builder.addCase(saveProductOrderList.fulfilled, (state, action) => {
      state.addToCart.data = action.payload.data.data;
      state.addToCart.error = undefined;
    });
    builder.addCase(saveProductOrderList.rejected, (state, action) => {
      state.addToCart.data = undefined;
      state.addToCart.error = `Something Went wrong. Please retry. \n ${
        action.payload?.data?.Message ? action.payload?.data?.Message : ""
      }`;
    });

    builder.addCase(updateCartCheckoutStatus.pending, (state) => {});
    builder.addCase(updateCartCheckoutStatus.fulfilled, (state, action) => {
      state.addToCart.data = undefined;
      state.addToCart.error = undefined;
    });
    builder.addCase(updateCartCheckoutStatus.rejected, (state, action) => {
      state.addToCart.data = undefined;
      state.addToCart.error = `Something Went wrong. Please retry. \n ${
        action.payload?.data?.Message ? action.payload?.data?.Message : ""
      }`;
    });

    builder.addCase(updateProductInCart.pending, (state) => {});
    builder.addCase(updateProductInCart.fulfilled, (state, action) => {
      state.addToCart.data = action.payload.data.data;
      state.addToCart.error = undefined;
    });
    builder.addCase(updateProductInCart.rejected, (state, action) => {
      state.addToCart.data = undefined;
      state.addToCart.error = `Something Went wrong. Please retry. \n ${
        action.payload?.data?.Message ? action.payload?.data?.Message : ""
      }`;
    });
  },
});

export default productOrderSlice.reducer;
