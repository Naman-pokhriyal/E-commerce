import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export function Login() {
  let history = useHistory();

  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [msg, setmsg] = useState("");

  const registerCall = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: pass,
    }).then((res) => {
      setmsg(res.data.msg);
    });
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={registerCall}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setpass(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
      {msg}
    </div>
  );
}

export default Login;
