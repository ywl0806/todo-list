import express from "express";
import { createTask, editTask, todoList } from "../controller/taskController";

const taskRouter = express.Router();

taskRouter.post("/createTask", createTask);
taskRouter.post("/todolist", todoList);
taskRouter.post("/edit", editTask);
export default taskRouter;
