import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import HomeReducer from "../redux/Reducer/ProfileReducer";
import ProfileReducer from "./auth.slice";
import settingsReducer from "./settings.slice copy";

const rootReducer = {
   homeRedux: HomeReducer,
   profileRedux: ProfileReducer,
   auth: authReducer,
   settings: settingsReducer,
};

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;
