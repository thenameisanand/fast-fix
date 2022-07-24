import React from "react";
import "./BookNow.css";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { db } from "./firebase";
import { useState } from "react";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import Taskers from './Taskers';

function BookNow() {
  const history = useHistory();
  const [buttonText, setButtonText] = useState('BooNow');
  const { serviceId } = useParams();
  const [serviceData, setServiceData] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  useEffect(() => {
    if (serviceId) {
      db.collection("services")
        .doc(serviceId)
        .onSnapshot((snapshot) => setServiceData(snapshot.data()));
    }
  });

  const BookNow = () => {
    if (serviceId) {
      setTimeout(() => {
        history.push(`/taskers/${serviceId}`);
        setSuccessMsg("Hello");
      }, 3000);
    } else {
    }
  };
const textChange = () => {
  setButtonText('Fetching Taskers....');
}
  return (
    <div className="login">
      {serviceId}
      <div className="login_container">
        <h1>{serviceData?.title}</h1>
        <p>{serviceData?.description}</p>
        <p>{successMsg}</p>
        <Button variant="outlined" color="primary" onClick={() => {BookNow();textChange();}}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default BookNow;
