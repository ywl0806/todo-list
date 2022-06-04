import { Container, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/sessionSlice";
import { destroyTask } from "../reducers/taskSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faRightToBracket,
  faPeopleGroup,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
const Header = () => {
  const loggedIn = useSelector((state) => state.persist.session.loggedIn);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(destroyTask());
    dispatch(logout());
  };
  return (
    <header>
      <Navbar>
        <Container>
          <Link to="/" className="navbar-brand ">
            <h3 data-tip="Go Home" className="font-monospace fs-2 fw-bold">
              <FontAwesomeIcon icon={faList} />
              {"  "}TODO LIST
            </h3>
            <ReactTooltip effect="float" type="info" place="right" />
          </Link>
          <div>
            {loggedIn ? (
              <div>
                <div>
                  <Link to="/" onClick={() => logoutHandler()}>
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      size={"3x"}
                      data-tip="Logout"
                    />
                    <ReactTooltip effect="float" type="info" place="right" />
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <Link to="/login">
                    <FontAwesomeIcon
                      icon={faRightToBracket}
                      size={"3x"}
                      data-tip="Login"
                    />
                    <ReactTooltip effect="float" type="info" place="right" />
                  </Link>
                </div>
                <div>
                  <Link to="/join">
                    <FontAwesomeIcon
                      icon={faPeopleGroup}
                      size={"3x"}
                      data-tip="Sign Up"
                    />
                    <ReactTooltip effect="float" type="info" place="right" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
