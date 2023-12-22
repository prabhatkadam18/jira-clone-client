import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    phases: [],
    tasks: [],
    filteredPhases: [],
  },
  reducers: {
    setPhases: (state, action) => {
      state.phases = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setFilteredPhases: (state, action) => {
      state.filteredPhases = action.payload;
    },
  },
});

export const { setPhases, setTasks, setFilteredPhases } = dataSlice.actions;

export default dataSlice.reducer;
