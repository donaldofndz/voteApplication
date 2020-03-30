import { createSlice } from "@reduxjs/toolkit";
import Constants from "../constants/Constants";

const constants = new Constants();

export const initialState = {
  loading: false,
  hasErrors: false,
  apiRoot: {}
};

const apiRootSlice = createSlice({
  name: "apiRoot",
  initialState,
  reducers: {
    getApiRoot: state => {
      state.loading = true;
    },
    getApiRootSuccess: (state, { payload }) => {
      state.apiRoot = payload;
      state.loading = false;
      state.hasErrors = false;
      state.domain = constants.getUrl().url;
    },
    getApiRootFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

export const {
  getApiRoot,
  getApiRootSuccess,
  getApiRootFailure
} = apiRootSlice.actions;
export const apiRootSelector = state => state.apiRoot;
export default apiRootSlice.reducer;

export function fetchApiRoot(endPoint) {
  return async dispatch => {
    dispatch(getApiRoot());

    try {
      const response = await fetch(endPoint);
      const data = await response.json();

      dispatch(getApiRootSuccess(data));
    } catch (error) {
      dispatch(getApiRootFailure());
    }
  };
}
