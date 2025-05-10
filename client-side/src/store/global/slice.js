// src/store/global/slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: window.localStorage.getItem("userId") || "",
  mode: window.localStorage.getItem("mode") || "dark", // 🚀 Load saved mode, default to "dark"
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setMode(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
      window.localStorage.setItem("mode", state.mode);
    },
  },
});

export const { setUser, setMode } = globalSlice.actions;
export default globalSlice.reducer;
