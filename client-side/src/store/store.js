import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import globalReducer from "./global/slice";
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
