import Task from "../model/Task";
import moment from "moment-timezone";

export const createTask = async (req, res) => {
  const { title, content, deadLine } = req.body;
  const writer = req.session.user;

  try {
    const newTask = await Task.create({
      title,
      content,
      writer,
      deadLine,
    });
    res.json(newTask);
  } catch (error) {
    console.log(error);
  }
};
export const todoList = async (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(400);
  }
  const user = req.session.user;
  const { isCompleted, deadLineOverdue } = req.body;
  const taskList = await Task.find({
    isRemoved: false,
    isCompleted,
    deadLine: deadLineOverdue ? { $lt: Date.now() } : { $ne: 1 },
  }).sort({
    createAt: "desc",
  });
  return res.status(200).json(taskList);
};
