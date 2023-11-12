import { configureStore } from "@reduxjs/toolkit";
import { birthdayApi } from "../services/birthday";

export const store = configureStore({
  reducer: {
    [birthdayApi.reducerPath]: birthdayApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(birthdayApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
