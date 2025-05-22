import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import globalReducer from "./global/slice";
import notificationsReducer from "./notification/slice";
import participantsReducer from "./participants/slice";
import themeReducer from "./theme/slice";
import trainingReducer from "./training/slice";
import userReducer from "./user/slice";

const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    usersReducer: userReducer,
    training: trainingReducer,
    themeReducer: themeReducer,
    participantsReducer: participantsReducer,
    notificationsReducer: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return [
      ...getDefaultMiddleware({
        seriasablecheck: false,
      }),
    ];
  },
});

export { store };
