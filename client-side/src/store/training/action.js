import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTraining = createAsyncThunk(
  "GET-TRAINING",
  async (_, { rejectWithValue }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/api/trainings", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JwtToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTraining = createAsyncThunk(
  "ADD-training",
  async (postData, { rejectWithValue, getState }) => {
    console.log("🚀 ~ postData:", postData);
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const trainingState = getState().training.data;

      const response = await axios.post(
        "http://localhost:5000/api/trainings",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );

      return [...trainingState, { ...response.data }];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTraining = createAsyncThunk(
  "DELETE-training",
  async (selectedId, { rejectWithValue, getState }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const prevData = getState().trainingReducer.data;
      const prevFilteredData = getState().trainingReducer.filteredData;
      let newData = [];
      let newFilteredData = [];

      await axios.delete(`http://localhost:5000/api/trainings/${selectedId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JwtToken}`,
        },
      });
      newData = [...prevData.filter((item) => item._id !== selectedId)];
      newFilteredData = [
        ...prevFilteredData.filter((item) => item._id !== selectedId),
      ];

      return { newData, newFilteredData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTraining = createAsyncThunk(
  "UPDATE-training",
  async ({ drawerId, values: updatedData }, { rejectWithValue, getState }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const prevData = getState().trainingReducer.data;

      const response = await axios.put(
        `http://localhost:5000/api/trainings/${drawerId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );

      const updatedTraining = response.data;

      const newData = prevData.map((training) =>
        training._id === drawerId ? updatedTraining : training
      );

      return { newData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const handleSelectAction = (state, action) => {
  const findSelected = state.data.find((s) => s.id === action.payload.key);
  state.selected = findSelected;
};

export const handleClearSelectedAction = (state) => {
  state.selected = {};
};
