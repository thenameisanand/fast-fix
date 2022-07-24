import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './Header.css';
import { Link } from "react-router-dom";
import { db, auth } from "./firebase";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";

function Header() {
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
  const history = useHistory();
const [ TotalCartItem , setTotalCartItem ] = useState([]);

  const handleAuthenticaton = () => {
    if (uid) {
      auth.signOut();
    }
  }
  useEffect(() => {
    if (uid) {
      db.collection("customers")
        .doc(uid)
        .collection("wishList")
        .get()
        .then((querySnapshot) => {
          const TotalCartItem = querySnapshot.size;
          setTotalCartItem(TotalCartItem);
        });
    }
  }, [uid]);
  return (
    <div className="header">
 
      <div className="header__left">
        <span className="header_left1" onClick={() => history.push('/servicepage')}>Services</span>

        <span className="header_left2" onClick={() => history.push('./bookings')}>Bookings</span>
      </div>

      <div className="header__center">
        <p onClick={() => history.push('/')}>Fast Fix</p>
      </div>
      <div className="header__nav">
        <Link to={!user && '/login'} style={{ textDecoration: "none" }}>
        <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineTwo">{uid ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>
        <Link to="/taskersignup" style={{ textDecoration: "none" }}>

        <div className="header__option">
          <span className="header__optionLineOne">Become a Tasker</span>
        </div>
        </Link>

        <Link to="/cart" style={{ textDecoration: "none" }}>
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {TotalCartItem}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
