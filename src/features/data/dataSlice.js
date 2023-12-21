import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    phases: [],
    tasks: [],
  },
  reducers: {
    setPhases: (state, action) => {
      state.phases = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { setPhases, setTasks } = dataSlice.actions;

export default dataSlice.reducer;
