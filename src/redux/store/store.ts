import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from '../slices/userSlice';
import userTypeSliceReducer from '../slices/userTypeSlice';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    userType: userTypeSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
