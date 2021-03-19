import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_API } from "../utils/config";

const initialState = {
  token: null,
  status: "idle",
  error: null,
  user: null,
};

/**
 * Actions
 */
export const findMe = createAsyncThunk("auth/findMe", (token) => {
  return fetch(`${BACKEND_API}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => ({ data, token }))
    .catch((error) => {
      console.error("Failed in reducer: ", error.message);
      return error.message;
    });
});

/**
 * Main Slice
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [findMe.pending]: (state, action) => {
      state.status = "loading";
    },
    [findMe.fulfilled]: (state, action) => {
      if (action.payload.type === "error") {
        state.status = "failed";
        state.error = action.payload.message;
      } else {
        state.status = "success";
        state.token = action.payload.token;
        state.user = action.payload.user;
      }
    },
    [findMe.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default authSlice.reducer;
