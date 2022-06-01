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
    const task = await Task.find({ deadLine: { $gt: new Date() } });
    console.log(task);
  } catch (error) {
    console.log(error);
  }
};
