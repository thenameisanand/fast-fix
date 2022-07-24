import React, { useState, useEffect } from "react";
import "./Admin.css";
import { Button } from "@material-ui/core";

import { db } from "./firebase";
import Taskers from './Taskers';
import CategoryOption from './CategoryOption';
function Admin() {
  const [taskersData, setTaskersData] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    db.collection("ServiceProviders").onSnapshot((snapshot) => {
      setTaskersData(
        snapshot.docs.map((doc) => ({
          taskerId: doc.id,
          data: doc.data(),
        }))
      );
    });
    db.collection("services").onSnapshot((snapshot) => {
      setServiceData(
        snapshot.docs.map((doc) => ({
          serviceId: doc.id,
          data: doc.data(),
        }))
      );
    });
    db.collection("categories").orderBy("name", "asc").onSnapshot((snapshot) => {
      setCategoryData(
        snapshot.docs.map((doc) => ({
          categoryId: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    db.collection("categories").add({
      name: categoryName,
    });
    setCategoryName("");
  };
  const updateData = (e) => {
    e.preventDefault();
    db.collection("categories").doc(dataIdToBeUpdated).update({
      title: updateCategoryName,
    });
  };

  const deleteCategory = (categoryId) => {
    if(window.confirm("Are you sure you want to delete this category?")) {
      db.collection("categories").doc(categoryId).delete();
    };
    }
    
  const deleteService = (serviceId) => {
   
      db.collection("services").doc(serviceId).delete();
    };
    
   

  const addService = () => {
    const categoryId = prompt("Please enter the service!");

    if(categoryId) {
      db.collection("categories").doc(categoryId).collection("services").add({
        title: title,
      });
    }
  }
  return (
    <div className="Admin">
      <div className="Admin__container">
        <div className="Admin__header">
          <h1>Icon</h1>
          <h1>Admin Panel</h1>
          <img src="https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80"></img>

        </div>

        <div className="Admin__middle">
          <h1>
            Categories______________________________________________________________________________
          </h1>
          <div className="Admin__add_category">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Add category"
            ></input>
            <Button onClick={submit}>Add Category</Button>
          </div>
          <table>
            <tr></tr>
            {categoryData?.map(({ categoryId, data }) => (
              <tr key={categoryId}>
                <td>{data.name}</td>
                <td>
                  <Button className="Update__button">Update</Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      deleteCategory(categoryId);
                    }}
                  >
                    Delete
                  </Button>
                </td>

                <td>
                  <Button onClick={addService}>Add Service</Button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      
        <div className="Admin__middleTwo">
          <h1>
            Services_______________________________________________________________________________
          </h1>
          <div className="Admin__add__service">
          <input type="text">
            
          </input>
        </div>
          <table>
            <tr></tr>
            {serviceData?.map(({ serviceId, data, src }) => (
              <tr key={serviceId}>
                <td>{data.title}</td>
                <td></td>
                <td>
                  <Button>Update</Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      deleteService(serviceId);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="Admin__middleThree">
        <h1>
            Taskers__________________________________________________________________________
          </h1>   
          <table>
            
              </table>

           </div>
      </div>
   
    </div>
  );
}

export default Admin;