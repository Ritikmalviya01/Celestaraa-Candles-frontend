import { createSlice } from "@reduxjs/toolkit";

// Utility function to save to localStorage
const saveAuthState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (e) {
    console.error("Could not save auth state", e);
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
};

// Load saved auth state from localStorage
const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (!serializedState) return initialState;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load auth state", e);
    return initialState;
  }
};

const persistedState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState: persistedState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
      saveAuthState(state);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      saveAuthState(state);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
