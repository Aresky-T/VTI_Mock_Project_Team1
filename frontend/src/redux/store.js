import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import settingsReducer from "./settings.slice";
import recipesReducer from "./recipes.slide";
import userReducer from "./user.slice";
import timeReducer from "./realtime.slice";

const rootReducer = {
   auth: authReducer,
   settings: settingsReducer,
   recipes: recipesReducer,
   user: userReducer,
   time: timeReducer
};

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;
