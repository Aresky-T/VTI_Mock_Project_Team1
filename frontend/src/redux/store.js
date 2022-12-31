import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import dropdownReducer from "./dropdown.slice";
import settingsReducer from "./settings.slice";

const rootReducer = {
   auth: authReducer,
   dropdown: dropdownReducer,
   settings: settingsReducer
};

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;
