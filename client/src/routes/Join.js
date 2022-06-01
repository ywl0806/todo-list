import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/axios";
const Join = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const handleEmail = (event) => setEmail(event.target.value);

  const [name, setName] = useState("");
  const handleName = (event) => setName(event.target.value);

  const [password, setPassword] = useState("");
  const handlePassword = (event) => setPassword(event.target.value);

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const handlePasswordConfirm = (event) =>
    setPasswordConfirm(event.target.value);

  const onSubmit = async () => {
    if (password !== passwordConfirm) {
      return alert("password is not equal");
    }

    const joinUrl = "/user/join";
    const data = { email, name, password, passwordConfirm };
    const result = await request("post", joinUrl, data);

    if (result.go) {
      navigate("/checkMail", { state: { email, name }, replace: true });
    }
    console.log(result);
  };
  return (
    <div>
      <h3> Join </h3>
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
        <label htmlFor="name">name </label>
        <input
          onChange={handleName}
          id="name"
          type="text"
          placeholder="name"
          value={name}
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
        <label htmlFor="password_verified">password_verified </label>
        <input
          onChange={handlePasswordConfirm}
          id="password_verified"
          type="password"
          placeholder="password_verified"
          value={passwordConfirm}
        />
      </div>
      <div>
        <button onClick={onSubmit}>submit</button>
      </div>
    </div>
  );
};

export default Join;
