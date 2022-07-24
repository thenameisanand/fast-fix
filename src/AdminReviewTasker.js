import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminViewService.css";
import "./AdminTaskers.css";
import { db } from "./firebase";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Taskers from "./Taskers";
import { Button } from "@material-ui/core";
import TaskDescription from "./TaskDescription";
import StarIcon from "@material-ui/icons/Star";

function AdminReviewTasker({ user }) {
  const [servicePro, setServicePro] = useState([]);
  const [roomDetails, setRoomDetails] = useState("");

  const [serviceProviders, setServiceProviders] = useState([]);
  const [taskData, setTaskersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { taskerId } = useParams();
  const history = useHistory();
  const [review, setReview] = useState([]);

  const [taskers, setTaskers] = useState([]);
  useEffect(() => {
    if (taskerId) {
      db.collection("ServiceProviders")
        .doc(taskerId)
        .onSnapshot((snapshot) => setTaskers(snapshot.data()));
    }
    db.collection("ServiceProviders").onSnapshot((snapshot) =>
      setTaskersData(
        snapshot.docs.map((doc) => ({
          taskerId: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, [taskerId]);
  useEffect(() => {
    db.collection("ServiceProviders").onSnapshot((snapshot) =>
      setTaskers(snapshot.docs.map((doc) => doc.data()))
    );
  });
  useEffect(() => {
    db.collection("ServiceProviders").onSnapshot((snapshot) =>
      setServicePro(
        snapshot.docs.map((doc) => ({
          taskerId: doc.id,
          name: doc.data().name,
        }))
      )
    );
  }, [taskerId]);
  useEffect(() => {
    if (taskerId) {
      db.collection("ServiceProviders")
        .doc(taskerId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }
    db.collection("ServiceProviders").onSnapshot((snapshot) =>
      setServiceProviders(
        snapshot.docs.map((doc) => ({
          taskerId: doc.id,
          name: doc.data().name,
          service: doc.data().service,
          phone: doc.data().phone,
          description: doc.data().description,
          src: doc.data().src,
        }))
      )
    );
  }, [taskerId]);
  useEffect(() => {
    if (taskerId) {
      db.collection("ServiceProviders")
        .doc(taskerId)
        .collection("reviews")
        .onSnapshot((snapshot) =>
          setReview(
            snapshot.docs.map((doc) => ({
              customer: doc.data().customer,
              details: doc.data().details,
              ratings: doc.data().ratings,
            }))
          )
        );
    }
  }, [taskerId]);

  const viewTasker = (taskerId) => {
    if (taskerId) {
      history.push(`/adminreviews/${taskerId}`);
    } else {
      console.log("");
    }
  };
  return (
    <div className="adminPage">
      <div className="adminPage__container">
        <AdminSidebar user={user} />
        <div className="adminPage__Right">
          <div className="Right__above">
            <h4>
              <input
                type="text"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                placeholder="Search Taskers"
              ></input>
            </h4>

            <h4>Sign In</h4>
          </div>
          <div className="adminCategoryRight__below">
            <div className="Right__belowOneCategory">
              <div className="belowOneCategory__heading">
                <h4>Customer Reviews</h4>
                <div className="adminViewService__below">
                  <table className="table__admin">
                    <tr>
                      <th>customer</th>
                      <th>Ratings</th>
                      <th>Reviews</th>
                    </tr>
                    {review
                      .filter(({ ratings }) => {
                        if (searchTerm === "") {
                          return ratings;
                        } else if (
                          ratings
                            .toLowerCase()
                            .includes(searchTerm.toLocaleLowerCase())
                        ) {
                          return ratings;
                        }
                      })
                      .map(({ taskerId, details, src, ratings, customer }) => (
                        <tr key={taskerId}>
                         
                          <td
                            onClick={() => {
                              viewTasker(taskerId);
                            }}
                          >
                            {customer}
                          </td>
                          <td><StarIcon style={{color: "red",fontSize: '15px'}}/>{ratings}</td>
                          <td>{details}</td>
                          <td>
                           
                          </td>
                          <td></td>
                        </tr>
                      ))}
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

export default AdminReviewTasker;
