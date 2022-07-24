import React, { useState, useEffect } from "react";
import "./TaskerRequestPage.css";
import { FiMenu } from "react-icons/fi";
import { auth, db, storage } from "./firebase";
import RequestCard from "./RequestCard";
import { Button } from "@material-ui/core";
import TaskerHeader from "./TaskerHeader";
import { Link, useHistory } from "react-router-dom";

function RescheduledTasks() {
  const [categoryData, setCategoryData] = useState([]);
  const history = useHistory();
  const [ TotalReServiceReq , setTotalReServiceReq ] = useState([]);
  const [ TotalServiceReq , setTotalServiceReq ] = useState([]);

  const [service, setService] = useState([]);
  const [channels, setChannels] = useState([]);
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
        .where("status","==","Rescheduled")

        .orderBy("date", "asc")
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
              timestamp: doc.data().timestamp,
              status: doc.data().status,
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
  const online = () => {
    if (uid) {
      db.collection("ServiceProviders").doc(uid).update({
        activeStatus: "ACTIVE NOW",
      });
    }
  };
  const offline = () => {
    if (uid) {
      db.collection("ServiceProviders").doc(uid).update({
        activeStatus: "OFFLINE",
      });
    }
  };
  useEffect(() => {
    if (uid) {
      db.collection("ServiceProviders")
        .doc(uid)
        .collection("ServiceRequests")
        .where("status","==","Rescheduled")

        .get()
        .then((querySnapshot) => {
          const TotalReServiceReq = querySnapshot.size;
          setTotalReServiceReq(TotalReServiceReq);
        });
    }
  }, [uid]);
  useEffect(() => {
    if (uid) {
      db.collection("ServiceProviders")
        .doc(uid)
        .collection("ServiceRequests")
        .where("status","==","")

        .get()
        .then((querySnapshot) => {
          const TotalServiceReq = querySnapshot.size;
          setTotalServiceReq(TotalServiceReq);
        });
    }
  }, [uid]);
  return (
    <div className="requestPage">
      <div className="requestPage__conatiner">
        <div className="requestPage__top">
          <h1> MY TASKS</h1>
          <h4>{categoryData?.name}</h4>
          <Button
            style={{
              letterSpacing: "5px",
              fontFamily: "monospace",
              border: "1px solid green",
              color: "green",
              fontSize: "12px",
            }}
            onClick={online}
          >
            Go Online
          </Button>
          <Button
            style={{
              letterSpacing: "5px",
              fontFamily: "monospace",
              border: "1px solid red",
              color: "red",

              fontSize: "12px",
              marginLeft: "5px",
            }}
            onClick={offline}
          >
            Go Offline
          </Button>

  

          <Button
            style={{
              letterSpacing: "5px",
              fontFamily: "monospace",
              border: "1px solid black",
              color: "black",

              fontSize: "12px",
              marginLeft: "15px",
            }}
        onClick={() => history.push('/TaskerRequestPage')}>
            Recieved Tasks ({TotalServiceReq})
          </Button>        
          <Button
            style={{
              letterSpacing: "5px",
              fontFamily: "monospace",
              border: "1px solid black",
              color: "black",

              fontSize: "12px",
              marginLeft: "15px",
            }}
          >
            Rescheduled Tasks ({TotalReServiceReq})
          </Button>

          <img title="Upload image" src={categoryData?.src} />
        </div>
        <div className="requestPage__topImage"></div>
        <div className="requestPage__bottom">
          <div className="requestPage__bottomContainer">
            {channels?.map(
              ({
                name,
                city,
                status,
                timestamp,
                requestId,
                pincode,
                date,
                time,
                service,
                address,
              }) => (
                <RequestCard
                  name={name}
                  date={date}
                  service={service}
                  address={address}
                  time={time}
                  pincode={pincode}
                  requestId={requestId}
                  city={city}
                  timestamp={timestamp}
                  status={status}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RescheduledTasks;
