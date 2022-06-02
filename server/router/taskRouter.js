import express from "express";
import { createTask, todoList } from "../controller/taskController";

const taskRouter = express.Router();

taskRouter.post("/createTask", createTask);
taskRouter.post("/todolist", todoList);
export default taskRouter;
