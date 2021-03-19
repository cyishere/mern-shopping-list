import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/itemSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    item: itemReducer,
    auth: authReducer,
  },
});

export default store;
