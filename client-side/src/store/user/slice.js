import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  deleteUser,
  getUsers,
  handleClearSelectedAction,
  handleSelectAction,
  updateUser,
} from "./action";

const initialState = {
  data: [],
  filteredData: [],
  selected: {},
  loading: false,
  error: undefined,
};

const userReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    handleSelect: handleSelectAction,
    handleClearSelected: handleClearSelectedAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = action.payload.newData;
        state.filteredData = action.payload.newFilteredData;
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.newData;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { handleSelect, handleClearSelected } = userReducer.actions;

export const selectUser = (state) => state.users;

export default userReducer.reducer;
