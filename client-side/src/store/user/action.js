import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "GET-USERS",
  async (_, { rejectWithValue }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/api/users", {
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

export const addUser = createAsyncThunk(
  "ADD-USER",
  async (postData, { rejectWithValue, getState }) => {
    console.log("🚀 ~ postData:", postData);
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const userState = getState().usersReducer.data;

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );

      return [...userState, { ...response.data.user }];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "DELETE-USER",
  async (selectedId, { rejectWithValue, getState }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const prevData = getState().usersReducer.data;
      const prevFilteredData = getState().usersReducer.filteredData;
      let newData = [];
      let newFilteredData = [];

      await axios.delete(`http://localhost:5000/api/users/${selectedId}`, {
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

export const updateUser = createAsyncThunk(
  "UPDATE-USER",
  async ({ drawerId, values: updatedData }, { rejectWithValue, getState }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const prevData = getState().usersReducer.data;

      const response = await axios.put(
        `http://localhost:5000/api/users/${drawerId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );

      const updatedUser = response.data;

      const newData = prevData.map((user) =>
        user._id === drawerId ? updatedUser : user
      );

      return { newData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getClientById = createAsyncThunk(
  "GET-CLIENT-BY-ID",
  async (id, { rejectWithValue }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const response = await axios.get(
        `http://localhost:5000/api/users/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );

      // Check if the user role is "client"
      if (response.data.role !== "client") {
        throw new Error("User is not a client");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getTrainerById = createAsyncThunk(
  "GET-TRAINER-BY-ID",
  async (id, { rejectWithValue }) => {
    try {
      const JwtToken = window.localStorage.getItem("authToken");
      const response = await axios.get(
        `http://localhost:5000/api/users/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );

      // Check if the user role is "trainer"
      if (response.data.role !== "trainer") {
        throw new Error("User is not a trainer");
      }

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
