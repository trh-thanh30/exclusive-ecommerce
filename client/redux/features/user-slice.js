import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutStart: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    signoutSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = null;
    },
    signoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    },
    deleteUserStart: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    changePasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = null;
    },
  },
});

export const {
  signinStart,
  signinSuccess,
  signinFailure,
  signoutStart,
  signoutSuccess,
  signoutFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  changePasswordSuccess,
} = userSlice.actions;
export default userSlice.reducer;
