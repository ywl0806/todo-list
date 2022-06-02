import { useSelector } from "react-redux";
import CreateTask from "../components/CreateTask";
import TodoList from "../components/TodoList";
import Login from "./Login";

const Home = () => {
  const user = useSelector((state) => state.persist.session);

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
            <CreateTask />
            <TodoList />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
