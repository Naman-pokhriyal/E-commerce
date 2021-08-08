import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export function Login() {
  let history = useHistory();

  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [msg, setmsg] = useState("");

  Axios.defaults.withCredentials = true;
  const registerCall = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: pass,
    }).then((res) => {
      setmsg(res.data.msg);
      if (res.data.key) {
        setTimeout(() => history.push("/"), 2000);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((res) => {
      if (res.data.loggedIn) {
        history.push("/");
      }
      // console.log(res.data.user._id);
    });
  }, []);

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

      <Link to="/signup">
        <p>Create Account</p>
      </Link>
      {msg}
    </div>
  );
}

export default Login;
