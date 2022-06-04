import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { modeChange } from "../reducers/taskSlice";
import { Button } from "react-bootstrap";
import "./TaskDetail.css";
const TaskDetail = () => {
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.task.currentTaskDetail);
  const currentUserId = useSelector((state) => state.persist.session._id);

  const goEdit = () => {
    dispatch(modeChange("edit"));
  };

  const dateFormat = (IsoDate) => {
    const dt = moment.utc(IsoDate).toDate();
    const localDate = moment(dt).local().format("YYYY-MM-DD HH:mm:ss");

    return localDate;
  };
  return (
    <div className="detail-container">
      <div className="row">
        <span className="col-3 item-title">ユーザー名</span>
        <span className="col item-value">{currentTask.writer.name}</span>
      </div>
      <div className="row">
        <span className="col-3 item-title">タイトル</span>
        <span className="col item-value">{currentTask.title}</span>
      </div>
      <div className="row row-content">
        <span className="col-3 item-title">内容</span>
        <span className="col item-value">{currentTask.content}</span>
      </div>

      <div className="row">
        <span className="col-3 item-title">期限</span>
        <span className="col item-value">
          {currentTask.deadLine ? dateFormat(currentTask.deadLine) : "-"}
        </span>
      </div>
      <div className="row row-comp justify-content-center">
        {currentTask.isCompleted ? (
          <span className="col-6 item-value complete">完了</span>
        ) : (
          <span className="col-6 item-value incomplete">未対応</span>
        )}
      </div>

      {currentTask.writer._id === currentUserId ? (
        <div className="btn-box">
          <Button className="go-edit-btn" onClick={() => goEdit()}>
            編集
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default TaskDetail;
