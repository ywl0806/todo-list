import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/sessionSlice";
import { destroyTask } from "../reducers/taskSlice";
const Header = () => {
  const loggedIn = useSelector((state) => state.persist.session.loggedIn);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(destroyTask());
    dispatch(logout());
  };
  return (
    <header>
      <h3> 헤더 </h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {loggedIn ? (
          <div>
            <Link to="/" onClick={() => logoutHandler()}>
              Logout
            </Link>
          </div>
        ) : (
          <div>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/join">Join</Link>
            </li>
          </div>
        )}
      </ul>
    </header>
  );
};

export default Header;
