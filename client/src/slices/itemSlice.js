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
    addItem: (state, action) => {
      state.entities = state.entities.concat(action.payload);
    },
    deleteItem: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { getAllItems, addItem, deleteItem } = itemSlice.actions;

export default itemSlice.reducer;
