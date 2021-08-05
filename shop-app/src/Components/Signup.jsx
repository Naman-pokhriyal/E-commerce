import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function Signup() {
  let history = useHistory();
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [msg, setmsg] = useState("");

  const registerCall = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/signups", {
      name: name,
      email: email,
      password: pass,
    }).then((res) => {
      setmsg(res.data.msg);
      if (res.data.key) {
        setTimeout(() => history.push("/login"), 3000);
      }
    });
  };

  return (
    <div>
      <h1>SIGN UP</h1>
      <form onSubmit={registerCall}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
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
          /