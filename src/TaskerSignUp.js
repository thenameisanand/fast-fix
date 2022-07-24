import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { useHistory } from "react-router-dom";
import "./TaskerLogin.css";
import './AdminSignUp.css';
import { Link } from 'react-router-dom'
import Taskers from './Taskers';
function TaskerSignUp() {
  const history = useHistory();
  const [service, setService] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    db.collection("services")
    .orderBy("title", "asc")
    .onSnapshot((snapshot) => {
      setCategoryData(
        snapshot.docs.map((doc) => ({
          serviceId: doc.id,
          title: doc.data().title,
        }))
      );
    });
  }, []);
  const handleSignup = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        console.log(credentials);
        db.collection("ServiceProviders")
          .doc(credentials.user.uid)
          .set({
            service: service,
            email: email,
            password: password,
          })
          .then(() => {
            setSuccessMsg("");
            setService("");
            setEmail("");
            setPassword("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg('Sign Up Successful!');
              history.push("/taskerlogin");
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
        <h1>Sign up as a tasker on Fast Fix</h1>
    {successMsg&&<>
    <div>{successMsg}</div>
    </>}
    <h5>Select your service </h5>
    <select 
            value={service}
           
            onChange={(e) => setService(e.target.value)}
          >
            {categoryData
            
            ?.map(({ serviceId, title }) => (
              <option key={serviceId}>{title}</option>
            ))}
          </select>
        <form onSubmit={handleSignup}>

         
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
            Already have an account? <strong onClick={() => history.push('/taskerlogin')}>Sign In</strong>
          </p>
            
        </div>
        {errorMsg&&<>
        <div>{errorMsg}</div>
        </>}
      </div>
    </div>
  );
}

export default TaskerSignUp;