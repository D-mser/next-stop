import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function submit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:4000/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log(response);

        if (response.data === "Log in successfull") {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("user", username);
        }

        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div style={{ padding: 30 }} className="bg">
      <div className="vh-centered login-form">
        <h1>Login</h1>
        <form action="login" method="POST">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
          <input type="submit" onClick={(event) => submit(event)} />
        </form>
      </div>
    </div>
  );
}
