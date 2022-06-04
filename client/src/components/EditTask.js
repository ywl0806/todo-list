import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, unSelectTask, updateTask } from "../reducers/taskSlice";
import { request } from "../utils/axios";
import "./TaskForm.css";

const EditTask = () => {
  const currentUserId = useSelector((state) => state.persist.session._id);
  const task = useSelector((state) => state.task.currentTaskDetail);
  const dispatch = useDispatch();
  //REMOVE FUNCTION
  const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };

    return confirmAction;
  };
  const deleteConfirm = async () => {
    try {
      const res = await request("post", "/task/remove", {
        id: task._id,
        writerId: task.writer._id,
      });
      dispatch(removeTask());
      dispatch(unSelectTask());
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const cancelConfirm = () => console.log("キャンセル");
  const confirmDelete = useConfirm(
    "タスクを削除します。　よろしいですか？",
    deleteConfirm,
    cancelConfirm
  );

  //states
  const [title, setTitle] = useState(task.title);
  const handleTitle = (e) => setTitle(e.target.value);

  const [content, setContent] = useState(task.content);
  const handleContent = (e) => setContent(e.target.value);

  const date = new Date(
    new Date(task.deadLine).getTime() -
      new Date().getTimezoneOffset() * 60 * 1000
  );

  const [deadLine, setDeadLine] = useState(
    task.deadLine === null ? null : date.toISOString().slice(0, 16)
  );
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
    <div className="task-inputContainer">
      <form onSubmit={handleSubmit}>
        <div className="form-group row task-inputbox">
          <label className="col-sm-2 col-form-label" htmlFor="user">
            ユーザー
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              placeholder="タイトル"
              value={task.writer.name}
              disabled
            />
          </div>
        </div>
        <div className="form-group row task-inputbox">
          <label className="col-sm-2 col-form-label" htmlFor="title">
            タイトル
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              onChange={handleTitle}
              id="title"
              type="text"
              placeholder="title"
              value={title}
              maxLength="64"
            />
          </div>
        </div>
        <div className="form-group row task-inputbox">
          <label className="col-sm-2 col-form-label" htmlFor="content">
            内容
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              onChange={handleContent}
              rows="5"
              id="content"
              type="text"
              placeholder="content"
              value={content}
            />
          </div>
        </div>

        <div className="form-group row task-inputbox">
          <legend className="col-form-label col-sm-3 pt-0">ステータス</legend>
          <div className="col-sm-9">
            <div className="form-check">
              <input
                id="noCompleted"
                type="radio"
                value="false"
                checked={!isCompleted}
                onChange={handleIsCompleted}
              />
              <label className="form-check-label" htmlFor="noCompleted">
                未対応
              </label>
            </div>
            <div className="form-check">
              <input
                id="isCompleted"
                type="radio"
                value="true"
                checked={isCompleted}
                onChange={handleIsCompleted}
              />
              <label className="form-check-label" htmlFor="isCompleted">
                完了
              </label>
            </div>
          </div>
        </div>
        <div className="form-group row task-inputbox">
          <label className="col-sm-2 col-form-label" htmlFor="deadLine">
            期限
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              id="deadLine"
              type="datetime-local"
              value={deadLine}
              onChange={handleDeadLine}
            ></input>
          </div>
        </div>
        <div className="form-group row task-inputbox justify-content-end">
          <div className="col-sm-3">
            <span className="btn btn-danger" onClick={confirmDelete}>
              削除
            </span>
          </div>
          <div className="col-sm-3">
            <button className="btn btn-primary" type="submit">
              編集
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
