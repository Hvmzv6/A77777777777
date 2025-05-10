import { createSlice } from "@reduxjs/toolkit";
import {
  addParticipant,
  deleteParticipant,
  getParticipants,
  handleClearSelectedAction,
  handleSelectAction,
  updateParticipant,
} from "./action";

const initialState = {
  data: [],
  filteredData: [],
  selected: {},
  loading: false,
  error: undefined,
};

const participantsReducer = createSlice({
  name: "training",
  initialState,
  reducers: {
    handleSelect: handleSelectAction,
    handleClearSelected: handleClearSelectedAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getParticipants.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getParticipants.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addParticipant.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(addParticipant.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(addParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteParticipant.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deleteParticipant.fulfilled, (state, action) => {
        state.data = action.payload.newData;
        state.filteredData = action.payload.newFilteredData;
        state.loading = false;
      })
      .addCase(deleteParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateParticipant.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateParticipant.fulfilled, (state, action) => {
        state.data = action.payload.newData;
        state.loading = false;
      })
      .addCase(updateParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { handleSelect, handleClearSelected } =
  participantsReducer.actions;

export default participantsReducer.reducer;
