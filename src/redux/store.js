import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/userSlics";
import { productSlice } from "./product/productSlice";
import { shippingAddressSlice } from "./user/manageAddressSlice";
import { productOrderSlice } from "./productOrder/productOrderSlice";

const reducer = combineReducers({
  user: userSlice.reducer,
  products: productSlice.reducer,
  shippingAddress: shippingAddressSlice.reducer,
  productsOrder: productOrderSlice.reducer,
});

// Reset store at the time of logout and error at the time of login
const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }
  return reducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
