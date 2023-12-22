import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isFiltered: false,
    error: null,
  },
  reducers: {
    setIsFiltered: (state, action) => {
      state.isFiltered = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setIsFiltered, setError, clearError } = uiSlice.actions;

export default uiSlice.reducer;
