import { useDispatch, useSelector } from "react-redux";
import CreateTask from "../components/CreateTask";
import TaskDetail from "../components/TaskDetail";
import TodoList from "../components/TodoList";
import EditTask from "../components/EditTask";
import { modeChange, unSelectTask } from "../reducers/taskSlice";
import Login from "./Login";
import { Alert, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import { welcomeMessage } from "../reducers/sessionSlice";
const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.persist.session);
  const [show, setShow] = useState(true);
  const welcome = user.welcome;
  const onClickPlusBtn = () => {
    dispatch(modeChange("create"));
    dispatch(unSelectTask());
  };
  const mode = useSelector((state) => state.task.currentMode);
  return (
    <div>
      {user.loggedIn ? (
        <div>
          <Alert
            show={show && welcome}
            onClose={() => {
              setShow(false);
              dispatch(welcomeMessage());
            }}
            variant="success"
            dismissible
          >
            <Alert.Heading>Welcome {user.name} !</Alert.Heading>
          </Alert>
        </div>
      ) : (
        <Login />
      )}
      {user.loggedIn ? (
        <Row className="home-container">
          <Col className="home-content">
            <TodoList />
          </Col>
          {mode === "detail" ? (
            <Col className="home-content">
              <TaskDetail />
            </Col>
          ) : mode === "create" ? (
            <Col className="home-content">
              <CreateTask />
            </Col>
          ) : mode === "edit" ? (
            <Col className="home-content">
              <EditTask />
            </Col>
          ) : null}
          {user.loggedIn && mode !== "create" ? (
            <div>
              <button
                className="btn btn-primary"
                onClick={() => onClickPlusBtn()}
              >
                <FontAwesomeIcon icon={faPlus} />
                　　タスク追加
              </button>
            </div>
          ) : null}
        </Row>
      ) : null}
    </div>
  );
};

export default Home;
