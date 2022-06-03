import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { modeChange } from "../reducers/taskSlice";
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
    <div>
      <div>
        <div>
          <h2>title: {currentTask.title}</h2>
        </div>
        <div>
          <h2>content: {currentTask.content}</h2>
        </div>
        <div>
          <h2>writer: {currentTask.writer.name}</h2>
        </div>
        <div>
          <h2>완료됨?: {currentTask.isCompleted ? "yes" : "no"}</h2>
        </div>
        <div>
          <h2>deadLine: {dateFormat(currentTask.deadLine)}</h2>
        </div>
        {currentTask.writer._id === currentUserId ? (
          <div>
            <button onClick={() => goEdit()}>Edit</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TaskDetail;
