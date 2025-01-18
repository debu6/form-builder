import { configureStore } from '@reduxjs/toolkit';
import { formApi } from '../services/formApi';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [formApi.reducerPath]: formApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(formApi.middleware),
});
