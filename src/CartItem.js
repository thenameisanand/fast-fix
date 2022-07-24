import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { db, auth } from "./firebase";

import "./CartItem.css";
import { useStateValue } from "./StateProvider";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarIcon from "@material-ui/icons/Star";
import { MdSentimentSatisfied } from "react-icons/md";
function CartItem({ tasId,id, src, name, description, price,service }) {
  const [wishList, setWishList] = useState([]);

  const history = useHistory();
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    const [roomDetails, setRoomDetails] = useState([]);

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          db.collection("customers")
            .doc(user.uid)
            .get()
           
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const user = GetCurrentUser();
  const uid = GetUserUid();
  const [{ basket }, dispatch] = useStateValue();
 
  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };
const removeFromWishList = () => {
  if (uid) {
    db.collection("customers")
    .doc(uid)
    .collection("wishList")
    .doc(id)
    .delete();
  }
}


  const print = () => {
console.log("Heeeeeeey");
  };
  return (
    <div className="searchResult">
      <img src={src} alt="" />

      <div className="searchResult__info">
        <div className="searchResult__infoTop">
          <div className="service__price">
            <p>$</p>
            <p>{price}</p>
            <p>/hour</p>
          </div>
          <h3>{name}</h3>
          <p>____</p>
          <p>{service}</p>
        </div>

        <div className="searchResult__infoBottom">
          <div className="searchResult__stars">
            <StarIcon className="searchResult__star" />
            <p>
              <strong></strong>
            </p>
          </div>

          <div className="cart__Button">
            <Button onClick={ removeFromWishList}>Remove from Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
