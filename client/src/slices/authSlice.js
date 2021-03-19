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
    .then((data) => ({ ...data, token }))
    .catch((error) => {
      console.error("Failed in reducer: ", error.message);
      return error.message;
    });
});

export const register = createAsyncThunk("auth/register", (userInfo) => {
  return fetch(`${BACKEND_API}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Failed in reducer: ", error.message);
      return error.message;
    });
});

export const login = createAsyncThunk("auth/login", (userInfo) => {});

/**
 * Main Slice
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },
    logout: (state, action) => {
      state.token = null;
      state.status = "idle";
      state.user = null;

      if (state.error) {
        state.error = null;
      }
    },
  },
  extraReducers: {
    // findMe
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
      state.error = action.payload;
    },
    // Register
    [register.pending]: (state, action) => {
      state.status = "loading";
    },
    [register.fulfilled]: (state, action) => {
      if (action.payload.type === "error") {
        state.status = "failed";
        state.error = action.payload.message;
      } else {
        state.status = "success";
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("shopping_token", action.payload.token);
      }
    },
    [register.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { clearError, logout } = authSlice.actions;

export default authSlice.reducer;
