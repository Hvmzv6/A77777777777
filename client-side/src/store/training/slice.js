import { createSlice } from "@reduxjs/toolkit";
import {
  addTraining,
  deleteTraining,
  getTraining,
  getTrainingByClient,
  getTrainingByTrainer,
  handleClearSelectedAction,
  handleSelectAction,
  updateTraining,
  approveTraining,
  declineTraining,
} from "./action";

const initialState = {
  data: [],
  filteredData: [],
  selected: {},
  loading: false,
  error: undefined,
};

const trainingReducer = createSlice({
  name: "training",
  initialState,
  reducers: {
    handleSelect: handleSelectAction,
    handleClearSelected: handleClearSelectedAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTraining.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getTraining.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getTraining.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addTraining.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(addTraining.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(addTraining.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteTraining.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deleteTraining.fulfilled, (state, action) => {
        state.data = action.payload.newData;
        state.filteredData = action.payload.newFilteredData;
        state.loading = false;
      })
      .addCase(deleteTraining.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateTraining.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateTraining.fulfilled, (state, action) => {
        state.data = action.payload.newData;
        state.loading = false;
      })
      .addCase(updateTraining.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(approveTraining.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(approveTraining.fulfilled, (state, action) => {
        state.data = state.data.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.loading = false;
      })
      .addCase(approveTraining.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(declineTraining.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(declineTraining.fulfilled, (state, action) => {
        state.data = state.data.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.loading = false;
      })
      .addCase(declineTraining.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getTrainingByClient.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getTrainingByClient.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getTrainingByClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getTrainingByTrainer.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getTrainingByTrainer.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getTrainingByTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { handleSelect, handleClearSelected } = trainingReducer.actions;

// ✅ Selector
export const selecttraining = (state) => state.training;

export default trainingReducer.reducer;
