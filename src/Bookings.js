import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminViewService.css";
import "./AdminTaskers.css";
import "./AdminPage.css";
import "./AdminSidebar.css";
import { db, auth } from "./firebase";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Taskers from "./Taskers";
import { Button } from "@material-ui/core";
import TaskDescription from "./TaskDescription";
import { useId } from "react";
import Sample from "./TaskerHomePage";
import TaskerDetails from "./TaskerDetails";
import { MdOutlineDashboard } from "react-icons/md";

function Bookings() {
  const { requestId } = useParams();
  const [servicePro, setServicePro] = useState([]);
  const [roomDetails, setRoomDetails] = useState("");
  const [categoryDetails, setCategoryDetails] = useState("");
  const [cus, setCus] = useState("");
  const [serviceProviders, setServiceProviders] = useState([]);
  const [taskData, setTaskersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { taskerId } = useParams();
  const history = useHistory();
  const [review, setReview] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [customer, setCustomerData] = useState("");
  const [taskers, setTaskers] = useState([]);
  const [show, setShow] = useState(true);

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
        .collection("serviceOrders")
        .where("response", "==", "Booking Accepted")
        .onSnapshot((snapshot) =>
          setServiceProviders(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [uid]);

  useEffect(() => {
    if (uid) {
      db.collection("customers")
        .doc(uid)
        .collection("serviceOrders")
        .where("response", "==", "Booking Accepted")

        .onSnapshot((snapshot) => {
          setCategoryData(
            snapshot.docs.map((doc) => ({
              booId: doc.id,
              response: doc.data().response,
              requestId: doc.data().requestId,
              tasId: doc.data().tasId,
              service: doc.data().service,
              name: doc.data().name,
              src: doc.data().src,
              date: doc.data().date,
            }))
          );
        });
    }
  }, [uid]);
  const viewTasker = (booId) => {
    if (booId) {
      history.push(`/userrequestpage/${booId}`);
      {
        tasId;
      }
    } else {
      console.log("");
    }
  };
  const getTasId = (tasId) => {
    if (tasId) {
      console.log(tasId);
    }
  };
  const accepted = () => {
    history.push(`/Bookings`);
  };
  const rejected = () => {
    history.push(`/Bookingrejected`);
  };
  const sample = (booId) => {
    if (booId) {
      setTimeout(() => {
        history.push(`/userrequestpage/${booId}`);
      }, 3000);
    }
  };

  useEffect(() => {
    if (uid) {
      db.collection("customers")
        .doc(uid)
        .onSnapshot((snapshot) => setCustomerData(snapshot.data()));
    }
  });

  return (
    <div className="adminPage">
      {requestId}
      <div className="adminPage__container">
        {show ? (
          <div className="adminPage__Left">
            <div className="adminPage__LeftDetails">
              <img
                style={{ marginTop: "10px" }}
                title="update profile picture"
                src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              ></img>
              <h1 style={{ marginTop: "15px" }}>Anand AS</h1>
            </div>
          </div>
        ) : null}
        <div className="status__container"></div>

        <div className="adminPage__Right">
          <div className="Right__above">
            <h4
              style={{
                fontFamily: "cursive",
                letterSpacing: "2px",
                fontSize: "25px",
                marginLeft: "400px",
              }}
            >
              My Bookings
              <div className="accept__button">
                <Button onClick={accepted}>Accepted</Button>
                <div className="reject__button">
                  <Button onClick={rejected}>Rejected</Button>
                </div>
              </div>
            </h4>

            <h4></h4>
          </div>

          <div className="adminCategoryRight__below">
            <div className="Right__belowOneCategory">
              <div className="belowOneCategory__heading">
                <h4> My Bookings</h4>

                <div className="adminViewService__below">
                  <table className="table__admin">
                    <tr>
                      <th>Status</th>
                      <th>Tasker</th>
                      <th>Profile</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                    {categoryData?.map(
                      ({
                        date,
                        booId,
                        src,
                        name,
                        service,
                        response,
                        tasId,
                        requestId,
                      }) => (
                        <tr key={booId}>
                          <td>
                            <strong style={{ color: "green" }}>
                              {response}
                            </strong>
                          </td>

                          <td>{name}</td>

                          <td>
                            <img src={src}></img>
                          </td>
                          <td>{service}</td>
                          <td>{date}</td>
                          <td>
                            <Button
                              onClick={() => {
                                sample(booId);
                              }}
                            >
                              Booking Status
                            </Button>
                          </td>
                        </tr>
                      )
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookings;
