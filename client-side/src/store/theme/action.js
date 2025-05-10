import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getThemes = createAsyncThunk(
  "GET-THEMES",
  async (_, { rejectWithValue }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/api/themes", {
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

export const addTheme = createAsyncThunk(
  "ADD-THEME",
  async (postData, { rejectWithValue, getState }) => {
    console.log("🚀 ~ postData:", postData);
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const themeState = getState().themeReducer.data;

      const response = await axios.post(
        "http://localhost:5000/api/themes",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );

      return [...themeState, { ...response.data.theme }];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTheme = createAsyncThunk(
  "DELETE-THEME",
  async (selectedId, { rejectWithValue, getState }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const prevData = getState().themeReducer.data;
      const prevFilteredData = getState().themeReducer.filteredData;
      let newData = [];
      let newFilteredData = [];

      await axios.delete(`http://localhost:5000/api/themes/${selectedId}`, {
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

export const updateTheme = createAsyncThunk(
  "UPDATE-THEME",
  async ({ drawerId, values: updatedData }, { rejectWithValue, getState }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const prevData = getState().themeReducer.data;

      const response = await axios.put(
        `http://localhost:5000/api/themes/${drawerId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );

      const updatedTheme = response.data;

      const newData = prevData.map((theme) =>
        theme._id === drawerId ? updatedTheme : theme
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
