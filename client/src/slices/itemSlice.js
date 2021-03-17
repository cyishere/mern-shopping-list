import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  entities: [
    { id: uuid(), name: "Coffee" },
    { id: uuid(), name: "Bra" },
    { id: uuid(), name: "Book" },
    { id: uuid(), name: "Shoes" },
  ],
};

/**
 * Interact with API
 */
// Get All Items
// export const getAllItems = createAsyncThunk("item/getAllItems", () => {
//   return fetch()
// })

/**
 * Main Slice
 */
const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    getAllItems: (state, action) => {
      return state;
    },
  },
});

export const { getAllItems } = itemSlice.actions;

export default itemSlice.reducer;
