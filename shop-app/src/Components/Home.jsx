import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function Home() {
  let history = useHistory();
  const [username, setUsername] = useState("");

  const LogOut = () => {
    Axios.get("http://localhost:3001/logout").then((res) => {
      if (!res.data.msg) {
        history.push("/login");
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((res) => {
      if (!res.data.loggedIn) {
        history.push("/login");
      }
      setUsername(res.data.user.name);
      console.log(res.data.user._id);
    });
  }, []);

  return (
    <div>
      <h1>HOME</h1>
      <p>Welcome, {username}</p>
      <button onClick={LogOut}>Logout</button>
    </div>
  );
}
