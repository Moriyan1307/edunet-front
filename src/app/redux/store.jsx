import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./slices/authSlice"; // Import your reducers

// Configure persist settings
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers and apply persistReducer
const rootReducer = combineReducers({
  auth: authReducer,
  // add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable to avoid issues with non-serializable data in localStorage
    }),
});

export const persistor = persistStore(store); // Export persistor
export default store;
