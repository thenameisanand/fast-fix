import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { useHistory } from "react-router-dom";
import "./TaskerLogin.css";
import TaskDescription from './TaskDescription';
function TaskerLogin() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
   

      auth.signInWithEmailAndPassword(email,password)
    
    .then(() => {
        setSuccessMsg('Login Successful');
        setEmail('');
        setPassword('');
        setErrorMsg('');
        setTimeout(() => {
            setSuccessMsg('');
            history.push('/taskerhomepage');
        }, 3000)
    }).catch(error => setErrorMsg(error.message));
    

  };

  return (
    <div className="tasker_auth">
      <div className="tasker_container">
        <h1>Sign in as a tasker on Fast Fix</h1>
        {successMsg && (
          <>
            <div>{successMsg}</div>
          </>
        )}
        <form onSubmit={handleLogin}>
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
            Log In
          </button>
        </form>
        <div className="signin__div"></div>
        <p>
            Don't have an account yet? <strong onClick={() => history.push('/taskersignup')}>Sign Up</strong>
          </p>
        {errorMsg && (
          <>
            <div>{errorMsg}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskerLogin;
