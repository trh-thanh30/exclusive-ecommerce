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
  },
});

export const { signinStart, signinSuccess, signinFailure, signoutStart, signoutSuccess, signoutFailure } = userSlice.actions;
export default userSlice.reducer;
