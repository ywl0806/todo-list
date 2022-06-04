import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    taskList: [],
    currentTaskDetail: {},
    currentTaskIndex: null,
    //mode: create, detail, edit
    currentMode: "",
    removed: false,
  },
  reducers: {
    setTask: (state, action) => {
      state.taskList = action.payload;
      state.currentTaskDetail = {};
      state.currentTaskIndex = null;
      state.currentMode = "";
    },
    addTask: (state, action) => {
      state.taskList.unshift(action.payload);
      state.currentTaskDetail = {};
      state.currentTaskIndex = null;
    },
    destroyTask: (state) => {
      state.taskList = [];
      state.currentTaskDetail = {};
      state.currentTaskIndex = null;
    },
    selectTask: (state, action) => {
      state.currentMode = "detail";
      state.currentTaskDetail = action.payload.task;
      state.currentTaskIndex = action.payload.index;
    },
    unSelectTask: (state) => {
      state.currentTaskDetail = {};
      state.currentTaskIndex = null;
    },
    updateTask: (state, action) => {
      state.currentTaskDetail = action.payload;
      state.taskList[state.currentTaskIndex] = action.payload;
      state.currentMode = "detail";
    },
    modeChange: (state, action) => {
      state.currentMode = action.payload;
    },
    removeTask: (state) => {
      state.removed = !state.removed;
      state.currentMode = "";
    },
  },
});

export const {
  setTask,
  addTask,
  destroyTask,
  selectTask,
  unSelectTask,
  updateTask,
  modeChange,
  removeTask,
} = taskSlice.actions;

export default taskSlice.reducer;
