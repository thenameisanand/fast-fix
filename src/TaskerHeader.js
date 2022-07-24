import React from "react";
import { useHistory } from "react-router-dom";
import './TaskerHeader.css';
import './Header.css';
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";

function  TaskerHeader() {

  const history = useHistory();

  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  }
  return (
    <div className="header__container">
 
      <div className="header__left">
        <span className="header_left1" onClick={() => history.push('/servicepage')}>Services</span>

        <span className="header_left2" onClick={() => history.push('./taskers')}>Taskers</span>
      </div>

      <div className="header__center">
        <p onClick={() => history.push('/')}>Fast Fix</p>
      </div>
      <div className="header__nav">
        <Link to={!user && '/login'} style={{ textDecoration: "none" }}>
        <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
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
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TaskerHeader;
