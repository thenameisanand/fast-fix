import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminViewService.css";
import "./AdminTaskers.css";
import { auth, db } from "./firebase";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Category from "./Category";

function AdminCategory() {
  const history = useHistory();

  

  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [roomDetails, setRoomDetails] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
  const addCategory = (e) => {
    e.preventDefault();
    console.log(typeof categoryId);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    console.log(formErrors);

    if (Object.keys(formErrors).length === 0 && isSubmit) {

  
        db.collection("categories").add({
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
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }
    db.collection("categories")
    .orderBy("name","asc")
    .onSnapshot((snapshot) =>
      setCategoryData(
        snapshot.docs.map((doc) => ({
          categoryId: doc.id,
          name: doc.data().name,
        }))
      )
    );
  }, [categoryId]);
  const viewTasker = (categoryId) => {
    if (categoryId) {
      history.push(`/bookservice/${categoryId}`);
    } else {
      console.log("");
    }
  };

  const deleteService = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      db.collection("categories").doc(categoryId).delete();
    }
  };
  const viewService = (categoryId) => {
    if (categoryId) {
      history.push(`/adminviewservice/${categoryId}`);
    }
  };

  const addService = (categoryId) => {
    if (categoryId) {
      history.push(`/adminservice/${categoryId}`);
    }
  };

  const updateCategory = (categoryId) => {
    if (categoryId) {
      history.push(`/adminUpdateCategory/${categoryId}`);
    }
  };
  return (
    <div className="adminPage">
      <div className="adminPage__container">
        <AdminSidebar 
      
        />
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
                              <div className="error__division"><p>{formErrors.name}</p></div>

            </h4>


          </div>
          <div className="adminCategoryRight__below">
            <div className="Right__belowOneCategory">
              <div className="belowOneCategory__heading">
                <h4>All Services</h4>
                <div className="add__yourcategory">
                  <form>
                    <input
                      placeholder="Add Category"
                      type="text"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                    />
                  </form>
                  <div className="addCategory">
                    <Button type="submit" onClick={addCategory}>
                      Add Category
                    </Button>

                  </div>

                </div>

                <div className="adminViewService__below">

                  <table className="table__admin">
                    <tr>
                      <th>Services</th>
                      <th>Action</th>
                      <th>Action</th>
                      <th>Action</th>
                      <th>Action</th>
                    </tr>
                    {categoryData
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
                      .map(({ categoryId, name }) => (
                        <tr key={categoryId}>
                          <td>{name}</td>
                          <td>
                            <Button style={{border: '1px solid red',color: 'red'}}
                              onClick={() => {
                                deleteService(categoryId);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                          <td>
                            <Button
                              onClick={() => {
                                addService(categoryId);
                              }}
                            >
                              Add Service
                            </Button>
                          </td>
                          <td>
                            {" "}
                            <Button
                              className="Update__button"
                              onClick={() => {
                                updateCategory(categoryId);
                              }}
                            >
                              Update
                            </Button>
                          </td>
                          <td>
                            <Button
                              onClick={() => {
                                viewService(categoryId);
                              }}
                            >
                              View Service
                            </Button>
                          </td>
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

export default AdminCategory;
