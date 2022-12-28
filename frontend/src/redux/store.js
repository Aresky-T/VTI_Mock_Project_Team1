import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";

const rootReducer = {
   auth: authReducer,
};

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;
