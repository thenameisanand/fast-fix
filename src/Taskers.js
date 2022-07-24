import React, { useState, useEffect } from "react";
import "./Taskers.css";
import { Button } from "@material-ui/core";
import { db } from "./firebase";

import StarIcon from "@material-ui/icons/Star";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function Taskers({
  taskerId,
  name,
  id,
  src,
  phone,
  service,
  city,
  location,
  title,
  description,
  star,
  price,
  total,
}) {
  const history = useHistory();
  const selectCategory = () => {
    if (id) {
      setTimeout(() => {
        history.push(`/tasker/${id}`);
      }, 1000);
    } else {
      console.log("NOOP");
    }
  };
  return (
    <div className="taskers" onClick={selectCategory}>
      <img src={src} alt="" />

      <div className="taskers__info">
        <div className="taskers__infoTop">
          <div className="taskers__price">
            <p></p>
            <p></p>
            <p></p>
          </div>
          <h2>{name}</h2>
          <p>____</p>
          <h3>Featured Skills</h3>
          <div className="job__des">
            <p>{service}</p>
            <div className="p">
              <p>₹{price}/hour</p>
            </div>
          </div>
        </div>

        <div className="taskers__infoBottom">
          <div className="taskers__stars">
            <p>
              <strong></strong>
            </p>
          </div>
          <div className="taskers__price">
            <h2>{location}</h2>
            <p></p>

            <div className="b">
              <Button onClick={selectCategory}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Taskers;
