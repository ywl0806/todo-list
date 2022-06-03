import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateTask from "../components/CreateTask";
import TaskDetail from "../components/TaskDetail";
import TodoList from "../components/TodoList";
import EditTask from "../components/EditTask";
import { modeChange, unSelectTask } from "../reducers/taskSlice";
import Login from "./Login";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.persist.session);
  const [onCreateTask, setOnCreateTask] = useState(false);
  const onClickPlusBtn = () => {
    setOnCreateTask(true);
    dispatch(modeChange("create"));
    dispatch(unSelectTask());
  };
  const mode = useSelector((state) => state.task.currentMode);
  return (
    <div>
      <h3> Home </h3>
      <div>
        {user.loggedIn ? <h1>{user.name}님 환영합니다!!</h1> : <Login />}
        {user.loggedIn ? (
          <div
            style={{
              display: "grid",
              gridTemplateRows: "400px 400px",
              gridTemplateColumns: "400px 400px",
            }}
          >
            <TodoList />

            {mode === "detail" ? (
              <TaskDetail />
            ) : mode === "create" ? (
              <CreateTask />
            ) : mode === "edit" ? (
              <EditTask />
            ) : null}
            {user.loggedIn && mode !== "create" ? (
              <button onClick={() => onClickPlusBtn()}>todo 추가</button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
