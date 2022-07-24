import { Button } from "@material-ui/core";
import React, { useState,  } from 'react'
import { useHistory } from "react-router-dom";

import "./Banner.css";
import Card from "./Card";
import { Link } from "react-router-dom";

function Banner() {
  const history = useHistory();

  return (
    <div className="banner">
      <div className="banner__content">
        <h1>Quality Services, On-Demand</h1>
        <Button onClick={() => history.push('/servicepage')} >Explore Services</Button>
      </div>
      
    </div>
  );
}

export default Banner;
