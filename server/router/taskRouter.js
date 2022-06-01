import express from "express";
import { createTask } from "../controller/taskController";

const taskRouter = express.Router();

taskRouter.post("/createTask", createTask);
export default taskRouter;
