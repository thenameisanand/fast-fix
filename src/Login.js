import React from "react";
import { Button } from "@material-ui/core";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

import "./Login.css";
function Login() {
  return (
    <div className="login">
      
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="login_headerLeft">
          <h1>FF</h1>
        </div>
      </Link>

      <div className="login_headerRight">
        <h1>Log into Fast Fix</h1>
      </div>
    </div>

  );
}

export default Login;
