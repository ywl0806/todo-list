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
  // const user = req.session.user;
  // console.log(user);
  const { isCompleted, deadLineOverdue, keyword } = req.body;
  try {
    const taskList = await Task.find({
      $and: [
        { isRemoved: false },
        { isCompleted },
        { deadLine: deadLineOverdue ? { $lt: Date.now() } : { $ne: 1 } },
        {
          $or: [
            { title: { $regex: keyword || "" } },
            { content: { $regex: keyword || "" } },
          ],
        },
      ],
    }).sort({
      createAt: "desc",
    });
    return res.status(200).json(taskList);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
export const editTask = async (req, res) => {
  const { _id, title, content, deadLine, isCompleted } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      _id,
      {
        title,
        content,
        deadLine,
        isCompleted,
        updateAt: Date.now(),
      },
      { new: true }
    );
    console.log(`update complete`);
    console.log(task);
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
  }
  return;
};
