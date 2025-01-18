import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated:localStorage.getItem('isAuthenticated')=="true"?true: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      
      state.isAuthenticated = true;
      localStorage.setItem('isAuthenticated',true)
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.setItem('isAuthenticated',false)
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
