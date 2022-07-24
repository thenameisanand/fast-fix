import { Button } from "@material-ui/core";
import React from "react";
import "./ServiceDetails.css";
function ServiceDetails() {
  return (
    <div className="taslogin">
      <div className="taslogin__container">
        <div className="taslogin__inputs">
          <div className="values">
            <h1>Sign up as a partner on Fast Fix</h1>
            <h5>Your Email Address</h5>
            <form>
              <input type="text"></input>
              <h5>Password</h5>
              <input type="text"></input>
            </form>
            <div className="button">
             
              <button className="taslogin__button">SignUp</button>
              <p>Already have an account? Sign In</p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
