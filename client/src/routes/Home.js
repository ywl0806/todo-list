import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateTask from "../components/CreateTask";
import Login from "./Login";

const Home = () => {
  const user = useSelector((state) => state.persist.session);

  return (
    <div>
      <h3> Home </h3>
      {user.loggedIn ? <h1>{user.name}님 환영합니다!!</h1> : <Login />}
      {user.loggedIn ? <CreateTask /> : null}
    </div>
  );
};

export default Home;
