import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_API } from "../utils/config";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

/**
 * Interact with API
 */
// Get All Items
export const getAllItems = createAsyncThunk("item/getAllItems", () => {
  return fetch(`${BACKEND_API}/items`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Failed in reducer: ", error.message);
      return error.message;
    });
});

/**
 * Main Slice
 */
const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.entities = state.entities.concat(action.payload);
    },
    deleteItem: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: {
    [getAllItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllItems.fulfilled]: (state, action) => {
      if (action.payload.type === "error") {
        state.error = action.payload.message;
        state.status = "failed";
      } else {
        state.entities.push(...action.payload.items);
        state.status = "success";
      }
    },
    [getAllItems.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { addItem, deleteItem } = itemSlice.actions;

export default itemSlice.reducer;

/**
 * @feature Reusable Selector Functions
 */
export const selectAllItems = (state) => state.item.entities;
