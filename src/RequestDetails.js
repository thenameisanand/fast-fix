import React, { useState, useEffect } from "react";
import "./TaskerRequestPage.css";
import "./TaskDescription.css";
import "./RequestDetails.css";
import { useHistory } from "react-router-dom";

import { FiMenu } from "react-icons/fi";
import { auth, db, storage } from "./firebase";
import RequestCard from "./RequestCard";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import Taskers from "./Taskers";
import { FaPhoneAlt } from "react-icons/fa";

function RequestDetails({ timestamp }) {
  const { requestId } = useParams();
  const [roomMessages, setRoomMessages] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [requestData, setRequestData] = useState("");
  const [service, setService] = useState([]);
  const [channels, setChannels] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [names, setUpdateCity] = useState("");
  const [response, setResponse] = useState("");
  const [tas, setTas] = useState([]);
  const [show, setShow] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [hours, setHours] = useState("");
  const [showFinish, setShowFinish] = useState(false);
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
          db.collection("ServiceProviders").doc(user.uid).get();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const user = GetCurrentUser();
  const uid = GetUserUid();

  useEffect(() => {
    if (uid) {
      db.collection("ServiceProviders")
        .doc(uid)
        .collection("ServiceRequests")
        .onSnapshot((snapshot) =>
          setService(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [uid]);
  useEffect(() => {
    if (uid) {
      db.collection("ServiceProviders")
        .doc(uid)
        .collection("ServiceRequests")
        .onSnapshot((snapshot) =>
          setChannels(
            snapshot.docs.map((doc) => ({
              requestId: doc.id,
              name: doc.data().name,
              date: doc.data().date,
              address: doc.data().address,
              time: doc.data().time,
              date: doc.data().date,
              pincode: doc.data().pincode,
              city: doc.data().city,
              description: doc.data().description,
              timestamp: doc.data().timestamp,
              user: doc.data().user,
            }))
          )
        );
    }
  }, [uid]);

  useEffect(() => {
    if (uid) {
      db.collection("ServiceProviders").onSnapshot((snapshot) =>
        setTas(
          snapshot.docs.map((doc) => ({
            tasId: doc.id,
            service: doc.data().service,
            phone: doc.data().phone,
            price: doc.data().price,
          }))
        )
      );
    }
  }, [uid]);
  useEffect(() => {
    if (uid) {
      db.collection("ServiceProviders")
        .doc(uid)
        .onSnapshot((snapshot) => setCategoryData(snapshot.data()));
    }
  });
  useEffect(() => {
    if (uid) {
      db.collection("ServiceProviders")
        .doc(uid)
        .collection("ServiceRequests")
        .doc(requestId)
        .onSnapshot((snapshot) => setCategoryName(snapshot.data()));
    }
  }, [uid]);

  const forefit = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to cancel this task?")) {
      if (uid) {
        db.collection("ServiceProviders")
          .doc(uid)
          .collection("ServiceRequests")
          .doc(requestId)
          .update({
            response: "Forefit",
          });
      }
    }
  };
  const yes = () => {
    if (window.confirm("Are you sure you want to confirm this task?")) {
      if (uid) {
        db.collection("ServiceProviders")
          .doc(uid)
          .collection("ServiceRequests")
          .doc(requestId)
          .update({
            response: "Booking Accepted",
            service: categoryData?.service,
            price: categoryData?.price,
            tasId: uid,
            date: categoryName?.date,
            timestamp: categoryName?.timestamp,
          });
      }
    }
  };
  const No = () => {
    if (window.confirm("Are you sure you want to confirm this task?")) {
      if (uid) {
        db.collection("ServiceProviders")
          .doc(uid)
          .collection("ServiceRequests")
          .doc(requestId)
          .update({
            response: "Booking Rejected",
            service: categoryData?.service,
            price: categoryData?.price,
            tasId: uid,
            date: categoryName?.date,
            timestamp: categoryName?.timestamp,
          });
      }
    }
  };
  const confirmTask = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to reject this task?")) {
      if (uid) {
        console.log("YESSS");
      }
      if (categoryName?.user) {
        db.collection("customers")
          .doc(categoryName?.user)
          .collection("serviceOrders")
          .add({
            response: "Booking Accepted",
            requestId: requestId,
            tasId: uid,
            service: categoryData?.service,
            name: categoryData?.name,
            src: categoryData?.src,
            price: categoryData?.price,
            date: categoryName?.date,
            timestamp: categoryName?.timestamp,
          });
        db.collection("customers").doc(categoryName?.user).update({
          response: "Booking Accepted",
          requestId: requestId,
          tasId: uid,
          service: categoryData?.service,
          price: categoryData?.price,
        });
      }
    }
  };
  const rejectTask = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to reject this task?")) {
      if (categoryName?.user) {
        db.collection("customers")
          .doc(categoryName?.user)
          .collection("serviceOrders")
          .add({
            response: "Booking Rejected",
            requestId: requestId,
            tasId: uid,
            service: categoryData?.service,
            name: categoryData?.name,
            src: categoryData?.src,
            price: categoryData?.price,
            phone: categoryData?.phone,
            date: categoryName?.date,
            timestamp: categoryName?.timestamp,
          });

        db.collection("customers")
          .doc(categoryName?.user)
          .collection("serviceOrders")
          .doc(requestId)
          .update({
            response: "Booking Rejected",
            requestId: requestId,
            tasId: uid,
            service: categoryData?.service,
            price: categoryData?.price,
            phone: categoryData?.phone,
            date: categoryName?.date,
            timestamp: categoryName?.timestamp,
          });
        db.collection("customers").doc(categoryName?.user).update({
          response: "Booking Rejected",
          requestId: requestId,
          tasId: uid,
          service: categoryData?.service,
          price: categoryData?.price,
        });
      }
    }
  };
  const finish = () => {
    setShowFinish(true);
  };
  const finishTask = (e) => {
    e.preventDefault();
    if (uid) {
      db.collection("ServiceProviders")
        .doc(uid)
        .collection("ServiceRequests")
        .doc(requestId)
        .update({
          hours: hours,
        });
    }
    setTimeout(() => {
      setShowFinish(false);
    }, 2000);
  };
  return (
    <div className="requestPage">
      {requestId}
      <div className="requestPage__conatiner">
        <div className="requestPage__top">
          <h1> MY TASKS</h1>
          <h4>{categoryData?.name}</h4>
          <h5>{categoryData?.service}</h5>
          {showFinish ? (
            <div
              style={{
                border: "1px solid grey",
                boxShadow: "0px 6px 18px -9px rgba(0, 0, 0, 0.75)",
                width: "200px",
                height: "100px",
                marginLeft: "540px",
              }}
            >
              <p>Hours Worked</p>
              <select
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              >
                <option>1</option>
                <option>1.5</option>
                <option>2</option>
                <option>2.5</option>
                <option>3</option>
                <option>3.5</option>
                <option>4</option>
                <option>4.5</option>
                <option>5</option>
                <option>5.5</option>
              </select>
              <Button
                onClick={finishTask}
                style={{
                  marginLeft: "10px",
                  color: "green",
                  border: "1px solid green",
                  height: "20px",
                }}
              >
                Finish Work
              </Button>
            </div>
          ) : null}
          <img title="Upload image" src={categoryData?.src} />
        </div>
        <div className="requestPage__topImage"></div>
      </div>
      <div className="requestPage__bottoms">
        <div className="description__containers">
          <div className="description__containersLeft">
            <h2>{categoryName?.name}</h2>
            <h3>Description</h3>
            <p>{categoryName?.description}</p>
            <h3>Date</h3>
            <p style={{ color: "blue" }}>{categoryName?.status}</p>
            <p>{categoryName?.date}</p>
            <h3>Time</h3>
            <p>{categoryName?.time}</p>
            <Button
              onClick={finish}
              style={{
                marginLeft: "10px",
                border: "1px solid green",
                color: "green",
              }}
            >
              Finish Task
            </Button>
          </div>
          <div className="description__containersRight">
            <h3>Address</h3>
            <p>
              {categoryName?.address}, {categoryName?.locality},{" "}
              {categoryName?.city},<br></br> {categoryName?.city},{" "}
              {categoryName?.state} - {categoryName?.pincode}
              <br></br>
              <br></br>
              <FaPhoneAlt /> {categoryName?.phone}
              <br></br>
              <br></br>
              <strong>
                Do you want to proceed?
                <Button
                  onClick={(e) => {
                    setShow(true);
                    yes();
                  }}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => {
                    setShowSecond(true);
                    No();
                  }}
                >
                  No
                </Button>
              </strong>
            </p>
            {show ? (
              <Button
                style={{ color: "green", border: "1px solid green" }}
                onClick={confirmTask}
              >
                Confirm Task
              </Button>
            ) : null}

            {showSecond ? (
              <Button
                style={{ color: "red", border: "1px solid red" }}
                onClick={rejectTask}
              >
                Cancel Task
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestDetails;
