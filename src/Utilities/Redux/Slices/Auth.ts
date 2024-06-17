import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthorized: boolean;
}

const initialState: AuthState = {
  isAuthorized: false,
};

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    alllowEntry: (state) => {
      state.isAuthorized = true;
    },
    denyEntry: (state) => {
      state.isAuthorized = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { alllowEntry, denyEntry } = AuthSlice.actions;

export default AuthSlice.reducer;
