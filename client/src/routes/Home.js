import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.persist.session);

  return (
    <div>
      <h3> Home </h3>
      {user.loggedIn ? <h1>{user.name}님 환영합니다!!</h1> : null}
    </div>
  );
};

export default Home;
