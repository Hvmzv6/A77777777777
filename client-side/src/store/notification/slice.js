import { createSlice } from "@reduxjs/toolkit";
import {
  createNotification,
  deleteAllNotifications,
  deleteNotification,
  fetchNotificationById,
  fetchNotifications,
  fetchNotificationsByReceiver,
  fetchNotificationsBySender,
  handleClearSelectedAction,
  handleSelectAction,
  markNotificationAsRead,
} from "./action";

const initialState = {
  data: [],
  loading: false,
  error: null,
  selectedNotification: null,
};

const notificationsReducer = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    handleSelect: handleSelectAction,
    handleClearSelected: handleClearSelectedAction,
  },
  extraReducers: (builder) => {
    builder
      // Fetch all notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch notifications by receiver
      .addCase(fetchNotificationsByReceiver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsByReceiver.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotificationsByReceiver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch notifications by sender
      .addCase(fetchNotificationsBySender.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsBySender.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotificationsBySender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch notification by ID
      .addCase(fetchNotificationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedNotification = action.payload;
      })
      .addCase(fetchNotificationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create notification
      .addCase(createNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Mark notification as read
      .addCase(markNotificationAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete notification
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete all notifications
      .addCase(deleteAllNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllNotifications.fulfilled, (state) => {
        state.loading = false;
        state.data = [];
      })
      .addCase(deleteAllNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { handleSelect, handleClearSelected } =
  notificationsReducer.actions;

export const selectUser = (state) => state.users;

export default notificationsReducer.reducer;
