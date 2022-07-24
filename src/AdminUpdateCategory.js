import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminCategory.css";
import "./AdminAddService.css";
import { db } from "./firebase";
import { useHistory } from "react-router-dom";
import * as firebase from "firebase/app";
import { useParams } from "react-router-dom";
import Category from "./Category";
import { Button } from "@material-ui/core";
import { storage } from "./firebase";
function AdminUpdateCategory() {
  const history = useHistory();

  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [customersData, setCustomersData] = useState([]);
  const [name, setUpdatedCustomerName] = useState("");
  const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");
 
 const initialValues = {
  name: "",
 };

 const [formValues, setFormValues] = useState(initialValues);
 const [formErrors, setFormErrors] = useState({});
 const [isSubmit, setIsSubmit] = useState(false);

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormValues({ ...formValues, [name]: value });
};

const updateData = (e) => {
  e.preventDefault();
  console.log(typeof categoryId);
  setFormErrors(validate(formValues));
  setIsSubmit(true);
 
};
useEffect(() => {
  console.log(formErrors);

  if (Object.keys(formErrors).length === 0 && isSubmit) {


      db.collection("categories")
      .doc(categoryId)
      .update({
        name: formValues.name,
      });
  
    
  }
}, [formErrors]);

const validate = (values) => {
  const errors = {};
  const regex = /^([a-zA-Z ]){2,30}$/;

  if (!values.name) {
    errors.name = "Category name is required!";
  } else if (!regex.test(values.name)) {
    errors.name = "Please enter a valid category";
  }
  return errors;
};
 useEffect(() => {
    if (categoryId) {
      db.collection("categories")
        .doc(categoryId)
        .onSnapshot((snapshot) => setCategoryName(snapshot.data()));
    }
  });

  useEffect(() => {
    db.collection("categories").onSnapshot((snapshot) => {
      setCustomersData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  
  

  
  return (
    <div className="addService">
      <div className="adminPage__container">
        <AdminSidebar />
        <div className="adminPage__Right">
          <div className="Right__above">
            <h4>
              <input type="text" placeholder="Search"></input>
            </h4>
            <h4>Sign In</h4>
          </div>
          <div className="adminCategoryRight__below">
            <div className="Right__belowOneCategory">
              <div className="belowOneCategory__heading">
                <h4>Update Category </h4>
              </div>
              <div className="belowOneCategory__inputs">
                <div className="inputs__details">
                  <h1> {categoryName?.name}</h1>

                  <form>
                  <input
                      placeholder="Update category"
                      type="text"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                    />

                    


                  </form>
                  <p>{formErrors.name}</p>
                  <div className="inputs__detailsTwo">
                    <form>
                      {" "}
                     
                    </form>
                  </div>
<Button onClick={updateData}>Update Category</Button>
                
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUpdateCategory;
