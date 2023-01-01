import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import HomeReducer from "./Reducer/HomeReducer";
import ProfileReducer from "./Reducer/ProfileReducer";
import settingsReducer from "./settings.slice";

const rootReducer = {
   auth: authReducer,
   settings: settingsReducer,
   profileRedux: ProfileReducer,
   homeRedux: HomeReducer,
};

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;
