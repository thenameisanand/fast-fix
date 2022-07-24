import React, { useState, useEffect } from "react";
import "./UserRequestPage.css";
import BookService from "./BookService";
import { Button } from "@material-ui/core";
import { TiTick } from "react-icons/ti";
import { storage, auth, db } from "./firebase";
import { useParams } from "react-router-dom";
import TaskerDetails from "./TaskerDetails";
import Bookings from "./Bookings";
import TaskDescription from "./TaskDescription";
import { FaPhoneAlt } from "react-icons/fa";

function UserRequestPage() {
  const { booId } = useParams();
  const { tasId } = useParams();
  const [serviceOrder, setServiceOrder] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [order, setOrderData] = useState([]);
  const [req, setRequestDetails] = useState([]);
  const [requests, setRequests] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const [customer, setCustomerData] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [tas, setTas] = useState("");
  const [show, setShow] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [getHours, setGetHours] = useState([]);
  const [date, setDate] = useState("");
  const [tasI, setTasId] = useState([]);
  const [snap, setSnap] = useState([]);
  const [catData, setCatData] = useState([]);
  const [showReschedule, setShowReschedule] = useState(false);
  const [value, setValue] = useState("");
  const [hours, setHours] = useState("");
  const [finishMsg, setFinishMsg] = useState("");
  const [buttonText, setButtonText] = useState(" Go to Checkout >");
const [getTas, setGetTas] = useState("");
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("YESS", user);
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }
  const uid = GetUserUid();

  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    const [roomDetails, setRoomDetails] = useState([]);

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          db.collection("customers").doc(user.uid).get();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const user = GetCurrentUser();
  useEffect(() => {
    if (uid) {
      db.collection("customers")
        .doc(uid)
        .onSnapshot((snapshot) => setCustomerData(snapshot.data()));
    }
  });

  useEffect(() => {
    if (uid) {
      db.collection("customers")
        .doc(uid)
        .collection("serviceOrders")
        .doc(booId)
        .onSnapshot((snapshot) => setServiceOrder(snapshot.data()));
    }
  }, [uid]);
  const orderCancel = () => {
    if (uid) {
      db.collection("customers")
        .doc(uid)
        .collection("serviceOrders")
        .doc(booId)
        .update({
          response: "Order Cancelled",
        });
    }
    if (serviceOrder?.tasId) {
      db.collection("ServiceProviders")
        .doc(serviceOrder?.tasId)
        .collection("ServiceRequests")
        .doc(serviceOrder?.requestId)
        .delete();
    }
  };
  const reschedule = () => {
    if (uid) {
      db.collection("customers")
        .doc(uid)
        .collection("serviceOrders")
        .doc(booId)
        .update({
          status: "Order rescheduled",
          date: date,
        });
    }
    if (serviceOrder?.tasId) {
      db.collection("ServiceProviders")
        .doc(serviceOrder?.tasId)
        .collection("ServiceRequests")
        .doc(serviceOrder?.requestId)
        .update({
          date: date,
          status: "Rescheduled",
        })
        .then(() => {
          setSuccessMsg("Your order successfully rescheduled!");
        });
    }
  };
  useEffect(() => {
    if (serviceOrder?.tasId) {
      db.collection("ServiceProviders")
        .doc(serviceOrder?.tasId)
        .collection("ServiceRequests")
        .doc(serviceOrder?.requestId)
        .onSnapshot((snapshot) => setGetHours(snapshot.data()));
    }
  }, [serviceOrder?.tasId]);
  useEffect(() => {
    if (serviceOrder?.tasId) {
      db.collection("ServiceProviders")
.doc(serviceOrder?.tasId)
.onSnapshot((snapshot) => setGetTas(snapshot.data()));
    }
  })
  const calculate = (x) => {
    if (getHours?.hours == "") {
      setFinishMsg("Task didn't finish yet!");
    } else {
      setShowTwo(true);
      x = serviceOrder?.price * getHours?.hours;
      setValue(x);
      console.log(x);
    }
  };
  const Checkout = () => {};
  const textChange = () => {
    setButtonText("Loading....");
  };
  return (
    <div className="userRequestPage">
      <div className="userRequestPage__container">
        <h3>{serviceOrder?.service}</h3>

        <strong style={{ color: "black" }}> {serviceOrder?.name}</strong>
        <div className="userRequestPage__top">
          <h1>
            <TiTick /> {serviceOrder?.response}
          </h1>
          <p></p>
          <Button onClick={() => setShow(true)}>Order Cancel</Button>
        </div>
        <div className="userRequestPage__middle">
          {show ? <p>Let us know your cancellation reason</p> : null}
          {show ? (
            <input placeholder="Describe here!" type="text"></input>
          ) : null}
          {show ? (
            <Button
              style={{
                marginLeft: "10px",
                border: "1px solid red",
                color: "red",
              }}
              onClick={orderCancel}
            >
              Cancel
            </Button>
          ) : null}
        </div>
        <div className="userRequestPage__bottom">
          <div className="userRequestPage__bottomTop">
            <Button onClick={() => setShowReschedule(true)}>Reshedule</Button>
            <div className="reschedule">
              {showReschedule ? (
                <input
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  type="date"
                ></input>
              ) : null}
              {showReschedule ? (
                <Button onClick={reschedule}>Submit</Button>
              ) : null}
            </div>
          </div>
          <div className="userRequestPage__below">
            <p>{successMsg}</p>
          </div>
        </div>
        <div className="contact__container">
          <h3></h3>

          <div className="contact__details">
            <h3>Contact Service Provider</h3>
            <strong style={{ marginLeft: "20px" }}>
              <FaPhoneAlt style={{ color: "green" }} /> {getTas?.phone}
            </strong>
            <strong style={{ marginLeft: "400px" }}>Payment Staus: </strong>{" "}
            <strong style={{ color: "red" }}>Not Paid</strong>
          </div>
        </div>
      </div>
      <div className="toggle__button">
        <div className="payment__div">
          <h3>Booking Date & Time</h3>
          <p style={{ marginTop: "-30px", color: "lightgray" }}>
            _____________
          </p>
          <p>{serviceOrder?.date}</p>
          <p style={{ color: "green" }}>{serviceOrder?.status}</p>
          <h3>Pricing</h3>
          <p style={{ marginTop: "-30px", color: "lightgray" }}>
            _____________
          </p>
          <div
            style={{ display: "flex", marginTop: "-20px" }}
            className="pricing__container"
          >
            <h4 style={{ color: "grey" }}>Baby Bathing</h4>
            <strong style={{ marginTop: "22px", marginLeft: "90px" }}>
              {serviceOrder?.price}
            </strong>
          </div>
          <div
            style={{ display: "flex", marginTop: "-20px" }}
            className="pricing__container"
          >
            <h4 style={{ color: "grey" }}>Hours Worked</h4>
            <strong style={{ marginTop: "22px", marginLeft: "85px" }}>
              {getHours?.hours} hours
            </strong>
          </div>
          <div
            style={{ display: "flex", marginTop: "-20px" }}
            className="pricing__container"
          >
            <h4 style={{ color: "black" }}>Total Amount</h4>
            <strong
              style={{ marginTop: "22px", marginLeft: "90px", color: "red" }}
            >
              ₹ {value}
            </strong>
          </div>
          <p style={{ marginTop: "-30px", color: "lightgray" }}>
            _____________
          </p>
          <Button
            style={{
              marginTop: "4px",
              backgroundColor: "whitesmoke",
              color: "black",
              border: "1px solid black",
              height: "30px",
              marginLeft: "76px",
            }}
            onClick={() => {
              calculate();
            }}
          >
            Finish Task
          </Button>
          <h4 style={{ marginTop: "12px", marginLeft: "55px", color: "red" }}>
            {finishMsg}
          </h4>
        </div>

        {showTwo ? (
          <Button
            onClick={() => {
              Checkout();
              textChange();
            }}
            style={{
              width: "200px",
              height: "30px",
              marginTop: "-10px",
              marginLeft: "45px",
              color: "white",
              backgroundColor: "orange",
              letterSpacing: "1px",
              fontFamily: "monospace",
              fontSize: "15px",
            }}
          >
            {buttonText}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default UserRequestPage;
