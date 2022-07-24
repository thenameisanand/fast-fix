import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useParams } from "react-router-dom";

import CartItem from "./CartItem";
import Services from "./Services";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";
import { db, auth } from "./firebase";

const anand = JSON.parse(localStorage.getItem("basket")) || [];
function Cart() {
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
const [wishList, setWishList] = useState([]);
 

  useEffect(() => {
    if (uid) {
      db.collection("customers")
      .doc(uid)
      .collection("wishList")
      .onSnapshot((snapshot) => 
      setWishList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          src: doc.data().src,
          price: doc.data().price,
          service: doc.data().service,
          tasId: doc.data().tasId,
        }))
      )
      )
    }
  },[uid])
  return (
    <div className="cart">
      <div className="cart_left"></div>

      <div>
        <div className="shopping">
          <h2 className="cart_title">Your Service Cart </h2>

          <h3>{user?.email}</h3>
        </div>
        {wishList.map((item) => (
          <CartItem 
            /* src="https://st2.depositphotos.com/1010613/6332/i/950/depositphotos_63322175-stock-photo-repairer-repairing-air-conditioner.jpg"
            title="AC Services"
            description="Unique activities we can do together, led by a world of hosts."
            price={199.90}*/
            id={item.id}
            src={item.src}
            name={item.name}
            description={item.description}
            price={item.price}
            service={item.service}
            
          />
        ))}
      </div>

      <div className="cart_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Cart;
