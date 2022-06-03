import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../reducers/taskSlice";
import { request } from "../utils/axios";

const EditTask = () => {
  const currentUserId = useSelector((state) => state.persist.session._id);
  const task = useSelector((state) => state.task.currentTaskDetail);
  const dispatch = useDispatch();
  //states
  const [title, setTitle] = useState(task.title);
  const handleTitle = (e) => setTitle(e.target.value);

  const [content, setContent] = useState(task.content);
  const handleContent = (e) => setContent(e.target.value);

  const date = new Date(
    new Date(task.deadLine).getTime() -
      new Date().getTimezoneOffset() * 60 * 1000
  );

  const [deadLine, setDeadLine] = useState(date.toISOString().slice(0, 16));
  const handleDeadLine = (e) => setDeadLine(e.target.value);

  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const handleIsCompleted = (e) => {
    setIsCompleted(e.target.value === "true");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await request("post", "/task/edit", {
        _id: task._id,
        title,
        content,
        deadLine,
        isCompleted,
      });
      console.log(res);
      dispatch(updateTask(res));
    } catch (error) {
      console.log(error);
    }
  };
  if (currentUserId !== task.writer._id) {
    return <div> 꺼지셈</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title </label>
          <input
            onChange={handleTitle}
            id="title"
            type="text"
            placeholder="title"
            value={title}
          />
        </div>
        <div>
          <label htmlFor="content">content </label>
          <textarea
            onChange={handleContent}
            id="content"
            type="text"
            placeholder="content"
            value={content}
          />
        </div>

        <div>
          <label htmlFor="isCompleted">Is Completed </label>
          <input
            id="isCompleted"
            type="radio"
            value="false"
            checked={!isCompleted}
            onChange={handleIsCompleted}
          />
          未対応
          <input
            id="isCompleted"
            type="radio"
            value="true"
            checked={isCompleted}
            onChange={handleIsCompleted}
          />
          完了
        </div>
        <div>
          <label htmlFor="deadLine">Dead Line </label>
          <input
            id="deadLine"
            type="datetime-local"
            value={deadLine}
            onChange={handleDeadLine}
          ></input>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default EditTask;
