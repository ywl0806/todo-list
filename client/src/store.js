import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./reducers/sessionSlice";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  session: sessionReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: { persist: persistedReducer },
  middleware: [thunk],
});

export default store;
