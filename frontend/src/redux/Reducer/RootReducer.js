import { combineReducers } from "redux";
import ProfileReducer from "./ProfileReducer";

export let RootReducer = combineReducers({
   profileRedux: ProfileReducer,
});
