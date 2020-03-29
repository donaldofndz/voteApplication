import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  question: {}
};

const questSlice = createSlice({
  name: "quest",
  initialState,
  reducers: {
    getQuest: state => {
      state.loading = true;
    },
    getQuestSuccess: (state, { payload }) => {
      state.question = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getQuestFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

export const {
  getQuest,
  getQuestSuccess,
  getQuestFailure
} = questSlice.actions;
export const questSelector = state => state.quest;
export default questSlice.reducer;

export function fetchQuest(endPoint) {
  return async dispatch => {
    dispatch(getQuest());
    try {
      const response = await fetch(endPoint);
      const data = await response.json();
      console.log(await data)
      dispatch(getQuestSuccess(data));
    } catch (error) {
      dispatch(getQuestFailure());
    }
  };
}
