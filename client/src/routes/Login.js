import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../reducers/sessionSlice";
import { request } from "../utils/axios";

const Login = () => {
  const navigete = useNavigate();

  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const handlePassword = (e) => setPassword(e.target.value);

  const onSubmit = async () => {
    const loginUrl = "/user/login";
    const data = { email, password };
    try {
      const payload = await request("post", loginUrl, data);
      console.log(payload.user);
      dispatch(setUser(payload.user));
      //ログイン成功時
      navigete("/");
    } catch (error) {
      //ログイン失敗時
      console.log(error);
    }
  };

  return (
    <div>
      <h3> Login </h3>
      <div>
        <label htmlFor="email">Email </label>
        <input
          onChange={handleEmail}
          id="email"
          type="email"
          placeholder="email"
          value={email}
        />
      </div>
      <div>
        <label htmlFor="password">password </label>
        <input
          onChange={handlePassword}
          id="password"
          type="password"
          placeholder="password"
          value={password}
        />
      </div>
      <div>
        <button onClick={onSubmit}>submit</button>
      </div>
    </div>
  );
};

export default Login;
