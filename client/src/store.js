import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/itemSlice";

const store = configureStore({
  reducer: {
    item: itemReducer,
  },
});

export default store;
