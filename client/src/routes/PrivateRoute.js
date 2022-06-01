import Home from "./Home";
import { Route, Routes } from "react-router-dom";

function PrivateRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default PrivateRoute;
