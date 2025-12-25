import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: false,
    isProfileComplete: false,
    isFirstLaunch: true,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.isProfileComplete = !!action.payload?.isProfileComplete;
      state.user = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.isProfileComplete = false;
      state.user = null;
    },
    navigateToHome: state => {
      state.isProfileComplete = true;
      state.isAuthenticated = true;
      if (state.user) {
        state.user.isProfileComplete = true;
      }
    },
    dispatchUser: (state, action) => {
      state.user = action.payload;
    },
    setFirstLaunch: (state, action) => {
      state.isFirstLaunch = action.payload;
    },
    updateUser: (state, action) => {
      if (state.user) {
        Object.assign(state.user, action.payload);
      }
    },
  },
});

export const {
  dispatchUser,
  login,
  logout,
  navigateToHome,
  setFirstLaunch,
  updateUser,
} = userSlice.actions;

export const selectIsAuthenticated = state => state.userReducer.isAuthenticated;
export const selectIsProfileComplete = state =>
  state.userReducer.isProfileComplete;
export const selectUser = state => state.userReducer.user;
export const selectIsFirstLaunch = state => state.userReducer.isFirstLaunch;

export default userSlice.reducer;
