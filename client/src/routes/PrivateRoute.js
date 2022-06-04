import Home from "./Home";
import { Route, Routes } from "react-router-dom";

function PrivateRoute() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />}></Route>
    </Routes>
  );
}

export default PrivateRoute;
