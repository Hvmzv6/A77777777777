import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getParticipants = createAsyncThunk(
  "GET-PARTICIPANTS",
  async (userId, { rejectWithValue }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const response = await axios.get(
        `http://localhost:5000/api/clients/${userId}/participants`,
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

export const addParticipant = createAsyncThunk(
  "ADD-PARTICIPANT",
  async (postData, { rejectWithValue, getState }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const participantState = getState().participantsReducer.data;

      const response = await axios.post(
        "http://localhost:5000/api/participants",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );

      return [...participantState, { ...response.data }];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteParticipant = createAsyncThunk(
  "DELETE-PARTICIPANT",
  async (selectedId, { rejectWithValue, getState }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const prevData = getState().participantsReducer.data;
      const prevFilteredData = getState().participantsReducer.filteredData;
      let newData = [];
      let newFilteredData = [];

      await axios.delete(
        `http://localhost:5000/api/participants/${selectedId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );
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

export const updateParticipant = createAsyncThunk(
  "UPDATE-PARTICIPANT",
  async ({ drawerId, values: updatedData }, { rejectWithValue, getState }) => {
    console.log("🚀 ~ updatedData:", updatedData);
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const prevData = getState().participantsReducer.data;

      const response = await axios.put(
        `http://localhost:5000/api/participants/${drawerId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );

      const updatedParticipant = response.data;
      console.log("🚀 ~ updatedParticipant:", updatedParticipant);

      const newData = prevData.map((participant) =>
        participant._id === drawerId ? updatedParticipant : participant
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
