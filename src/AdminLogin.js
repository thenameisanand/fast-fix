import React, { useState } from "react";
import { auth, db } from "./firebase";
import { useHistory } from "react-router-dom";
import "./TaskerLogin.css";
function AdminLogin() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .then((credentials) => {
      db.collection("admin")
      .doc(credentials.user.uid)
      .get({
        Email: email,
        Password: password,
      })
      console.log("cred",credentials);
      setSuccessMsg('Login Successful');
        setEmail('');
        setPassword('');
        setErrorMsg('');
        setTimeout(() => {
            setSuccessMsg('');
            history.push('/adminpage');
        }, 3000)
    }).catch(error => setErrorMsg(error.message));
  
  };

  return (
    <div className="tasker_auth">
      <div className="tasker_container">
        <h1>Sign in as an admin on Fast Fix</h1>
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
        {errorMsg && (
          <>
            <div>{errorMsg}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
