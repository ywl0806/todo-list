import express from "express";
import {
  createTask,
  editTask,
  removeTask,
  todoList,
} from "../controller/taskController";

const taskRouter = express.Router();

taskRouter.post("/createTask", createTask);
taskRouter.post("/todolist", todoList);
taskRouter.post("/edit", editTask);
taskRouter.post("/remove", removeTask);
export default taskRouter;
