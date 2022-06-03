import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../reducers/taskSlice";
import { request } from "../utils/axios";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const handleTitle = (e) => setTitle(e.target.value);

  const [content, setContent] = useState("");
  const handleContent = (e) => setContent(e.target.value);

  const now = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
  );
  const [deadLine, setDeadLine] = useState(now.toISOString().slice(0, 16));
  const handleDeadLine = (e) => setDeadLine(e.target.value);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await request("post", "/task/createTask", {
        title,
        content,
        deadLine,
      });
      dispatch(addTask(res));
      //inputを初期化
      setTitle("");
      setContent("");
      setDeadLine(now.toISOString().slice(0, 16));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title </label>
          <input
            onChange={handleTitle}
            id="title"
            type="title"
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
          <label htmlFor="deadLine">Dead Line </label>
          <input
            id="deadLine"
            type="datetime-local"
            value={deadLine}
            onChange={handleDeadLine}
          ></input>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default CreateTask;
