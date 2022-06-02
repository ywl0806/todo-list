import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    taskList: [],
  },
  reducers: {
    setTask: (state, action) => {
      state.taskList = action.payload;
    },
    addTask: (state, action) => {
      state.taskList.unshift(action.payload);
    },
    destroyTask: (state) => {
      state = [];
    },
  },
});

export const { setTask, addTask, destroyTask } = taskSlice.actions;

export default taskSlice.reducer;
