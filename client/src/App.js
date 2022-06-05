import Header from "./components/layouts/Header";
import { useSelector } from "react-redux";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { Container } from "react-bootstrap";
import Footer from "./components/layouts/Footer";

function App() {
  const user = useSelector((state) => state.persist.session);

  return (
    <div>
      <Header />
      <Container className="mt-5 mb-5">
        <main>{user.loggedIn ? <PrivateRoute /> : <PublicRoute />}</main>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
