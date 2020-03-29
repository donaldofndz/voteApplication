import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  questList: []
};

const questListSlice = createSlice({
  name: "questList",
  initialState,
  reducers: {
    getQuestList: state => {
      state.loading = true;
    },
    getQuestListEmpty: state => {
      state.isEmpty = true;
      state.loading = false;
      state.hasErrors = false;
    },
    getQuestListSuccess: (state, { payload }) => {
      state.questList = payload;
      state.isEmpty = false;
      state.loading = false;
      state.hasErrors = false;
    },
    getQuestListFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

export const {
  getQuestList,
  getQuestListEmpty,
  getQuestListSuccess,
  getQuestListFailure
} = questListSlice.actions;
export const questListSelector = state => state.questList;
export default questListSlice.reducer;

export function fetchQuestList(endPoint) {
  return async dispatch => {
    dispatch(getQuestList());

    try {
      const response = await fetch(endPoint);
      const data = await response.json();
      (await data.length) > 0
        ? dispatch(getQuestListSuccess(data))
        : dispatch(getQuestListEmpty());
    } catch (error) {
      dispatch(getQuestListFailure());
    }
  };
}
