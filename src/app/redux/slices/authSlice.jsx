// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

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
