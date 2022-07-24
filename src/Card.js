import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./Card.css";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Card({ id, src, title, description, price }) {
  const history = useHistory();

  const [state, dispatch] = useStateValue();
 
  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        src: src,
        title: title,
        description: description,
        price: price,
      },
    });
  };
  return (
    <div className="card">
      <img src={src} alt="" />
      <div className="card__info">
        <h2>{title}</h2>
        <h4>{description}</h4>
        <div className="price">
          <small>$</small>

          <h3>{price}</h3>
          <small>/hour</small>
        </div>
      </div>
      <Button onClick={addToCart}>Add to Cart</Button>
    </div>
  );
}

export default Card;
