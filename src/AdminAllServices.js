import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminViewService.css";
import "./AdminTaskers.css";
import { db } from "./firebase";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';

function AdminAllServices() {
  const [roomDetails, setRoomDetails] = useState("");

  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { serviceId } = useParams();
  const history = useHistory();

 

 useEffect(() => {
   if (serviceId) {
     db.collection("ServiceProviders")
     .doc(serviceId)
     .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
   }
   db.collection("services")
   .onSnapshot((snapshot) =>
   setServices (
     snapshot.docs.map((doc) => ({
       serviceId: doc.id,
       title: doc.data().title,
       description: doc.data().description,
       src: doc.data().src,
       price: doc.data().price,


     }))
   )
   )
 },[serviceId])
  const viewTasker = (taskerId) => {
    if(taskerId){
      history.push(`/bookservice/${taskerId}`);
    } else {
      console.log("");
    }
  };

  const deleteService = (serviceId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      db.collection("services").doc(serviceId).delete();
    }
  };
  const updateService = (serviceId) => {
    if (serviceId) {
      history.push(`/adminUpdateService/${serviceId}`);
    }
  };

  return (
    <div className="adminPage">
      <div className="adminPage__container">
        <AdminSidebar />
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
                <h4>All Services</h4>
                <div className="adminViewService__below">
                  <table className="table__admin">
                    <tr>
                      <th>Profile</th>
                      <th>Service</th>
                      <th>Description</th>
                      <th>Action</th>
                      <th>Action</th>
                    </tr>
                    {services
                      .filter(({ title }) => {
                        if (searchTerm === "") {
                          return title;
                        } else if (
                          title
                            .toLowerCase()
                            .includes(searchTerm.toLocaleLowerCase())
                        ) {
                          return title;
                        }
                      })
                      .map(({serviceId, title, price, src, description }) => (
                        <tr key={serviceId}>
                          <td>
                            <img src={src}></img>
                          </td>
                          <td onClick={() => {viewTasker(serviceId);}}
                        >{title}</td>
                          <td>{description}</td>
                          <td><Button onClick={() => {deleteService(serviceId);}}>Delete</Button></td>
                          <td><Button
                              className="Update__button"
                              onClick={() => {
                                updateService(serviceId);
                              }}
                            >
                              Update
                            </Button></td>
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

export default AdminAllServices;