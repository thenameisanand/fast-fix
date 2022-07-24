import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { auth, db } from "./firebase";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./AdminViewService.css";
import "./AdminTaskers.css";
function AdminPage() {
  const [roomDetails, setRoomDetails] = useState("");
  const [serviceProviders, setServiceProviders] = useState([]);
  const { taskerId } = useParams();

  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { serviceId } = useParams();
  const [admin, setAdmin] = useState([]);
 
  const [totalUsers, setTotalUsers] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalServices, setTotalServices] = useState(0);

  useEffect(() => {
    db.collection("ServiceProviders").get().then((querySnapshot) => {
      const TotalUsers = querySnapshot.size
        setTotalUsers(TotalUsers)

    })
  }, []);
  
  useEffect(() => {
    db.collection("categories").get().then((querySnapshot) => {
      const TotalUsers = querySnapshot.size
        setTotalCategories(TotalUsers)

    })
  }, []);

  
  useEffect(() => {
    db.collection("services").get().then((querySnapshot) => {
      const TotalUsers = querySnapshot.size
        setTotalServices(TotalUsers)

    })
  }, []);
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
    if (serviceId) {
      db.collection("ServiceProviders")
        .doc(serviceId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }
    db.collection("services").onSnapshot((snapshot) =>
      setServices(
        snapshot.docs.map((doc) => ({
          serviceId: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          src: doc.data().src,
          price: doc.data().price,
        }))
      )
    );
  }, [serviceId]);
  const viewTasker = (taskerId) => {
    if (taskerId) {
      history.push(`/bookservice/${taskerId}`);
      console.log(totalUsers)
    } else {
      console.log("");
    }
  };

  const history = useHistory();

  
 

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/adminlogin");
    });
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
                placeholder="Search"
              ></input>
            </h4>
          
          
          </div>
          <div className="Right__middle">
            <div className="Right__middleOne">
              <h4>Total Services</h4>
              <h1>{totalServices}</h1>
            
              <h5>See all ></h5>
            </div>
            <div className="Right__middleOne">
              <h4>Total Categories</h4>
              <h1>{totalCategories}</h1>
              <h5>See all ></h5>
            </div>
            <div className="Right__middleOne">
              <h4>Total Services</h4>
              <h1>54</h1>
              <h5>See all ></h5>
            </div>
            <div className="Right__middleOne">
              <h4>Total Users</h4>
              <h1>{totalUsers}</h1>
              <h5>See all ></h5>
            </div>
          </div>
          <div className="Right__below">
            <div className="Right__belowOne">
              <table className="table__admin">
                <tr>
                  <th>Profile</th>
                  <th>Service</th>
                  <th>Description</th>
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
                  .map(({ serviceId, title, price, src, description }) => (
                    <tr key={serviceId}>
                      <td>
                        <img src={src}></img>
                      </td>
                      <td
                        onClick={() => {
                          viewTasker(serviceId);
                        }}
                      >
                        {title}
                      </td>
                      <td>{description}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
              </table>
            </div>

            <div className="Right__belowTwo">
              <table className="table__admin">
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                </tr>
                {serviceProviders
                  .filter(({ name }) => {
                    if (searchTerm === "") {
                      return name;
                    } else if (
                      name
                        .toLowerCase()
                        .includes(searchTerm.toLocaleLowerCase())
                    ) {
                      return name;
                    }
                  })
                  .map(
                    ({ taskerId, name, service, phone, src, description }) => (
                      <tr key={taskerId}>
                        <td>
                          <img src={src}></img>
                        </td>
                        <td
                          onClick={() => {
                            viewTasker(taskerId);
                          }}
                        >
                          {name}
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
  );
}

export default AdminPage;
