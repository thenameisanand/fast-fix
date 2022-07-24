import React, { useState } from "react";
import { auth, db } from "./firebase";
import { useHistory } from "react-router-dom";
import "./TaskerLogin.css";

import './AdminSignUp.css';
import { Link } from 'react-router-dom'
function AdminSignUp() {
  const history = useHistory();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        console.log(credentials);
        db.collection("admin")
          .doc(credentials.user.uid)
          .set({
            FullName: fullName,
            Email: email,
            Password: password,
          })
          .then(() => {
            setSuccessMsg("");
            setFullName("");
            setEmail("");
            setPassword("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg('Sign Up Successful!');
              history.push("/adminlogin");
            }, 3000);
          }).catch(error => setErrorMsg(error.message));
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <div className="tasker_auth">
      <div className="tasker_container">
        <h1>Sign up as an admin on Fast Fix</h1>
    {successMsg&&<>
    <div>{successMsg}</div>
    </>}
        <form onSubmit={handleSignup}>
          <h5>Your Name</h5>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <h5>Your Email</h5>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Your Password</h5>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="tasker_loginButton">
            Register as a Tasker
          </button>
        </form>
        <div className="signin__div">
          <p>
            Already have an account? <strong onClick={() => history.push('/adminlogin')}>Sign In</strong>
          </p>
            
        </div>
        {errorMsg&&<>
        <div>{errorMsg}</div>
        </>}
      </div>
    </div>
  );
}

export default AdminSignUp;
