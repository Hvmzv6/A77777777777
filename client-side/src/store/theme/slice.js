import { createSlice } from "@reduxjs/toolkit";
import {
  addTheme,
  deleteTheme,
  getThemes,
  handleClearSelectedAction,
  handleSelectAction,
  updateTheme,
} from "./action";

const initialState = {
  data: [],
  filteredData: [],
  selected: {},
  loading: false,
  error: undefined,
};

const themeReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    handleSelect: handleSelectAction,
    handleClearSelected: handleClearSelectedAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getThemes.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getThemes.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getThemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(addTheme.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(addTheme.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(addTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteTheme.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deleteTheme.fulfilled, (state, action) => {
        state.data = action.payload.newData;
        state.filteredData = action.payload.newFilteredData;
        state.loading = false;
      })
      .addCase(deleteTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateTheme.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.data = action.payload.newData;
        state.loading = false;
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { handleSelect, handleClearSelected } = themeReducer.actions;

export const selectTheme = (state) => state.users;

export default themeReducer.reducer;
