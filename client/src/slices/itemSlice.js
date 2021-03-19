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

// Add New Item
export const addItem = createAsyncThunk(
  "item/addItem",
  ({ itemInfo, token }) => {
    return fetch(`${BACKEND_API}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(itemInfo),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error("Failed in reducer: ", error.message);
        return error.message;
      });
  }
);

// Delete Item
export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  ({ itemId, token }) => {
    return fetch(`${BACKEND_API}/items/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error("Failed in reducer: ", error.message);
        return error.message;
      });
  }
);

/**
 * Main Slice
 */
const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
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
    [addItem.fulfilled]: (state, action) => {
      if (action.payload.type === "error") {
        state.error = action.payload.message;
      } else {
        state.entities.push(action.payload.item);
      }
    },
    [addItem.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteItem.fulfilled]: (state, action) => {
      if (action.payload.type === "error") {
        state.error = action.payload.message;
      } else {
        const itemId = action.payload.item;
        state.entities = state.entities.filter((item) => item.id !== itemId);
      }
    },
    [deleteItem.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default itemSlice.reducer;

/**
 * @feature Reusable Selector Functions
 */
export const selectAllItems = (state) => state.item.entities;
