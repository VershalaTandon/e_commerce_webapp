import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";

// Login
export const login = createAsyncThunk(
  "userService/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userService.login(data);
      return res;
    } catch (err) {
      const error = rejectWithValue(err.response);
      return error;
    }
  }
);

// Register API
export const register = createAsyncThunk(
  "userService/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userService.register(data);
      return res;
    } catch (err) {
      const error = rejectWithValue(err.response);
      return error;
    }
  }
);

// Logout API
export const logout = createAsyncThunk(
  "userService/logout",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userService.logout(data);
      return res;
    } catch (err) {
      const error = rejectWithValue(err.response);
      return error;
    }
  }
);

// Define the initial state using declared type
const initialState = {
  userData: undefined,
  error: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteLoginData: (state, { payload }) => {
      state.userData = undefined;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {});
    builder.addCase(login.fulfilled, (state, action) => {
      state.userData = action.payload.data.data;
      state.error = undefined;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.userData = undefined;
      state.error = `Something Went wrong. Please retry. \n ${
        action.payload?.data?.Message ? action.payload?.data?.Message : ""
      }`;
    });

    builder.addCase(register.pending, (state) => {});
    builder.addCase(register.fulfilled, (state, action) => {
      state.userData = action.payload.data.data;
      state.error = undefined;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.userData = undefined;
      state.error = `Something Went wrong. Please retry. \n ${
        action.payload?.data?.Message ? action.payload?.data?.Message : ""
      }`;
    });

    builder.addCase(logout.pending, (state) => {});
    builder.addCase(logout.fulfilled, (state, action) => {
      state.userData = undefined;
      state.error = undefined;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.userData = undefined;
      state.error = `Something Went wrong. Please retry. \n ${
        action.payload?.data?.Message ? action.payload?.data?.Message : ""
      }`;
    });
  },
});

export default userSlice.reducer;
export const { deleteLoginData } = userSlice.actions;
