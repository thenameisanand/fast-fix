import React, { useEffect, useState } from "react";import AdminSidebar from "./AdminSidebar";
import "./AdminViewService.css";
import "./AdminCategory.css";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import Category from './Category';

function AdminViewService() {
  const history = useHistory();
  const [categoryData, setCategoryData] = useState([]);

  const { categoryId } = useParams();
 const [categoryDetails, setCategoryDetails] = useState("");
  const [serviceDetails, setServiceDetails] = useState([]);
useEffect(() => {
    if (categoryId) {
        db.collection("categories")
        .doc(categoryId)
        .onSnapshot((snapshot) => setCategoryDetails(snapshot.data()));
    }
    db.collection("categories")
    .doc(categoryId)
    .collection("services")
    .onSnapshot((snapshot) => 
    setServiceDetails(snapshot.docs.map((doc) => doc.data()))
    );
}, [categoryId]);
useEffect(() => {
  if (categoryId) {
  db.collection("categories")
  .doc(categoryId)
  .collection("services")
    .onSnapshot((snapshot) => {
      setCategoryData(
        snapshot.docs.map((doc) => ({
          serviceId: doc.id,
          title: doc.data().title,
          requestId: doc.data().requestId,
          description: doc.data().description,
          price: doc.data().price,
          src: doc.data().src,

        }))
      );
    });
  }
}, [categoryId]);
const deleteService = (serviceId) => {
  if (window.confirm("Are you sure you want to delete this category?")) {
  if (categoryId) {
db.collection("categories")
.doc(categoryId)
.collection("services")
.doc(serviceId)
.delete();

}
 
  }
};
  return (
    <div className="adminPage">
    
      <div className="adminPage__container">
        <AdminSidebar />
        <div className="adminPage__Right">
          <div className="Right__above">
            <h4 title="Dashboard">Dashboard</h4>
            <h4>Sign In</h4>
          </div>
          <div className="adminCategoryRight__below">
            <div className="Right__belowOneCategory">
              <div className="belowOneCategory__heading">
                <h4>Services in {categoryDetails?.name} category</h4>
                <div className="adminViewService__below">
                <table className="table__admin">
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Profile</th>
                    <th></th>
                  </tr>
                  {categoryData?.map(({serviceId,title, price, src, description}) => (
                      <tr key={serviceId}>
                          
                          <td>{title}</td>
                          <td>{description}</td>
                          <td><img src={src}></img></td>
                     <td><Button onClick={() => {deleteService(serviceId);}}>Delete</Button></td>
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

export default AdminViewService;
