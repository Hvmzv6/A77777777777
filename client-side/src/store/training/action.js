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
        postData.values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );

      return [...trainingState, { ...response.data.training }];
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
      const prevData = getState().training.data;

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

export const approveTraining = createAsyncThunk(
  "APPROVE-training",
  async (trainingId, { rejectWithValue }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:5000/api/trainings/${trainingId}/approve`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const declineTraining = createAsyncThunk(
  "DECLINE-training",
  async (trainingId, { rejectWithValue }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:5000/api/trainings/${trainingId}/decline`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTrainingByClient = createAsyncThunk(
  "GET-TRAINING-BY-CLIENT",
  async (userId, { rejectWithValue }) => {
    console.log("🚀 ~ userId:", userId);
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const response = await axios.get(
        `http://localhost:5000/api/trainings/client/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getTrainingByTrainer = createAsyncThunk(
  "GET-TRAINING-BY-TRAINER",
  async (userId, { rejectWithValue }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const response = await axios.get(
        `http://localhost:5000/api/trainings/trainer/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );
      return response.data;
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
