import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  isAuthorized: boolean;
}

const initialState: CounterState = {
  isAuthorized: false,
};

export const AuthSlice = createSlice({
  name: "counter",
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
