import Home from "./Home";
import Join from "./Join";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import CheckMail from "../components/CheckMail";
function PublicRoute() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/join" element={<Join />}></Route>
      <Route path="/checkMail" element={<CheckMail />}></Route>
    </Routes>
  );
}

export default PublicRoute;
