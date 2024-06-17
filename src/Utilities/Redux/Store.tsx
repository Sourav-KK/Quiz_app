import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Authorization from "./Slices/Auth";
import SelectedAns from "./Slices/Selected_Answers";
import storage from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  Auth: Authorization,
  Answers: SelectedAns,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
