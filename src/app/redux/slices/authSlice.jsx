// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userRole: null, // 'student', 'professor', or 'admin'
  user: null, // Stores the user's profile information
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.role; // Set the role (e.g., 'student')
      state.user = action.payload.user; // Set the user object
    },
    setSignOut: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.user = null;
    },
  },
});

export const { setSignIn, setSignOut } = authSlice.actions;
export default authSlice.reducer;
