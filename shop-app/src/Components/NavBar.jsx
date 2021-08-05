import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NavBar extends Component {
  render() {
    return (
      <nav>
        <div className="wrapper">
          <div className="logo">Logo</div>
          <ul className="nav-list">
            <Link to="/login">
              <li className="nav-link">Login</li>
            </Link>
            <Link to="/signup">
              <li className="nav-link">Sign Up</li>
            </Link>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
