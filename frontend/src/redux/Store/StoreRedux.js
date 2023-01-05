import { applyMiddleware, compose, createStore } from "redux";
import { RootReducer } from "../../Reducer/RootReducer";
import thunk from "redux-thunk";
import { createStoreHook } from "react-redux";

// export let storeRedux = createStore(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true }));

// Sử dụng middleware
const middleware = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const storeRedux = createStoreHook(RootReducer, middleware);
