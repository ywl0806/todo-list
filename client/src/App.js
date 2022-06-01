import Header from "./components/Header";

import { useSelector } from "react-redux";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const user = useSelector((state) => state.persist.session);

  return (
    <div>
      <Header />
      <main>{user.loggedIn ? <PrivateRoute /> : <PublicRoute />}</main>
    </div>
  );
}

export default App;
