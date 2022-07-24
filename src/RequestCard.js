import React, { useState, useEffect } from "react";
import "./RequestCard.css";
import "./TaskerRequestPage.css";
import { FaBeer } from "react-icons/fa";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { db ,auth} from "./firebase";

function RequestCard({
  requestId,
  name,
  date,
  phone,
  pincode,
  locality,
  address,
  city,
  state,
  time,
  service,
  timestamp,
  status,
  
  
}) {
  const [buttonText, setButtonText] = useState('More Details..');
  const [succMsg, setSuccessMsg] = useState("");
  const history = useHistory();
  const selectCategory = () => {
    if (requestId) {
      setTimeout(() => {
        history.push(`/requestdetails/${requestId}`);
      },2000)

      console.log("YESS");
    } else {
      console.log("NOOP");
    }
  };

  const updateCategory = (requestId) => {
      setButtonText('New text');
  
   
  };
 
  return (
    <div className="requestCard">
     
      <div  onClick={selectCategory} className="requestCard__container">
        <div className="requestCard__containerElements">
          <div className="requestCard__top">
          
            <h3 onClick={selectCategory}>{name}</h3>
            <strong>{city}</strong>
          </div>
          <div className="requestCard__bottom">
            <h4>{date}</h4>
            <h4 style={{color: 'blue'}}>{status}</h4>
            <p>{new Date(timestamp?.toDate()).toUTCString()}(requested date)</p>

            <h5>{time}</h5>
            <p>Attupurathu House </p>
            <div className="requestCard__button">
              <Button
               onClick={updateCategory}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
        <div className="requestCard__image">
<img style={{marginLeft: '-20px'}} src="https://images.unsplash.com/photo-1542740348-39501cd6e2b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"></img>
        </div>
      </div>
    </div>
  );
}

export default RequestCard;
