import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import settingsReducer from "./settings.slice";
import recipesReducer from "./recipes.slide";
import userReducer from "./user.slice";
import timeReducer from "./realtime.slice";
import loadingReducer from "./loading.slice";

const rootReducer = {
   auth: authReducer,
   settings: settingsReducer,
   recipes: recipesReducer,
   user: userReducer,
   time: timeReducer,
   loading: loadingReducer
};

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;
