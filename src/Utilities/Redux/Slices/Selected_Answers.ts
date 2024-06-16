import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface selectedAnswersState {
  selectedAnswers: { id: string; ans: string }[];
  totalScore: number;
}

const initialState: selectedAnswersState = {
  selectedAnswers: [],
  totalScore: 0,
};

export const selectedAnswersSlice = createSlice({
  name: "selectedAnswers",
  initialState,
  reducers: {
    addAnswer: (state, action: PayloadAction<{ id: string; ans: string }>) => {
      const { id, ans } = action.payload;
      // Check if an answer for this question id already exists, if yes, update it; otherwise, add new entry.
      const existingIndex = state.selectedAnswers.findIndex(
        (item) => item.id === id
      );
      if (existingIndex !== -1) {
        state.selectedAnswers[existingIndex].ans = ans;
      } else {
        state.selectedAnswers.push({ id, ans });
      }
    },

    removeAnswer: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      state.selectedAnswers = state.selectedAnswers.filter(
        (item) => item.id !== idToRemove
      );
    },

    resetAnswers: (state) => {
      state.selectedAnswers = [];
    },

    score: (state, action: PayloadAction<number>) => {
      state.totalScore += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAnswer, removeAnswer, resetAnswers, score } =
  selectedAnswersSlice.actions;

export default selectedAnswersSlice.reducer;
