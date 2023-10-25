import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../../services/productService";

// Product category
export const getProductCategoryList = createAsyncThunk(
  "productService/getProductCategoryList",
  async (data, { rejectWithValue }) => {
    try {
      const res = await productService.getProductCategoryList();
      return res;
    } catch (err) {
      const error = rejectWithValue(err.response);
      return error;
    }
  }
);

// Product list API
export const getProductList = createAsyncThunk(
  "productService/getProductList",
  async (data, { rejectWithValue }) => {
    try {
      const res = await productService.getProductList();
      return res;
    } catch (err) {
      const error = rejectWithValue(err.response);
      return error;
    }
  }
);

// Define the initial state using declared type
const initialState = {
  category: {
    categoryList: undefined,
    error: undefined,
  },
  product: {
    productList: undefined,
    error: undefined,
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    saveCategoryData: (state, { payload }) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getProductCategoryList.pending, (state) => {});
    builder.addCase(getProductCategoryList.fulfilled, (state, action) => {
      state.category.categoryList = action.payload.data.data;
      state.category.error = undefined;
    });
    builder.addCase(getProductCategoryList.rejected, (state, action) => {
      state.category.categoryList = undefined;
      state.category.error = `Something Went wrong. Please retry. \n ${
        action.payload?.data?.Message ? action.payload?.data?.Message : ""
      }`;
    });

    builder.addCase(getProductList.pending, (state) => {});
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.product.productList = action.payload.data.data;
      state.product.error = undefined;
    });
    builder.addCase(getProductList.rejected, (state, action) => {
      state.product.productList = undefined;
      state.product.error = `Something Went wrong. Please retry. \n ${
        action.payload?.data?.Message ? action.payload?.data?.Message : ""
      }`;
    });
  },
});

export default productSlice.reducer;
