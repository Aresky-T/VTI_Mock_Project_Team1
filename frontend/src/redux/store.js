import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import settingsReducer from "./settings.slice";
import recipesReducer from "./recipes.slide";

const rootReducer = {
   auth: authReducer,
   settings: settingsReducer,
   recipes: recipesReducer
};

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;
