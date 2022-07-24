import React, { useState, useEffect } from "react";
import "./TaskerHomePage.css";
import { auth, db, storage } from "./firebase";
import { useStateValue } from "./StateProvider";
import TaskerLogin from "./TaskerLogin";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Taskers from "./Taskers";
import { Button } from '@material-ui/core';

function Sample() {
  const [serviceProvider,  setServiceProvidersData] = useState("");
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
          db.collection("ServiceProviders")
            .doc(user.uid)
            .get()
           
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const user = GetCurrentUser();
  const uid = GetUserUid();
  const history = useHistory();
  const [serviceId, setServiceId] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  const [service, setService] = useState([]);
  const { roomId } = useParams();
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>", authUser);
      if (authUser) {
        dispatch({
          type: "SET_TASKER",
          tasker: authUser,
        });
      } else {
        dispatch({
          type: "SET_TASKER",
          tasker: null,
        });
      }
    });
  }, []);
  const initialValues = {
    options: "",
    src: "",
    name: "",
    phone: "",
    service: "",
    city: "",
    price: "",
    description: "",
    age: "",
    
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(typeof categoryId);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (serviceId) {
      db.collection("services")
        .doc(serviceId)
        .onSnapshot((snapshot) => setService(snapshot.data()));
    }
  });
  useEffect(() => {
    db.collection("services").onSnapshot((snapshot) => {
      setCategoryData(
        snapshot.docs.map((doc) => ({
          serviceId: doc.id,
          title: doc.data().title,
        }))
      );
    });
  }, []);

  useEffect(() => {
    if (uid) {
      db.collection('ServiceProviders')
      .doc(uid)
      .onSnapshot((snapshot) => setServiceProvidersData(snapshot.data()));
    }
  })
  useEffect(() => {
    console.log(formErrors);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      history.push("/chooseservice");
      if (uid) {
        db.collection("ProviderRequests")
        .add({
          name: formValues.name,
          phone: Number(formValues.phone),
          city: formValues.city,
          price: Number(formValues.price),
          description: formValues.description,
          age: formValues.age,
          tasId: uid,
        })
        db.collection("ServiceProviders").doc(uid).update({
          name: formValues.name,
          phone: Number(formValues.phone),
          city: formValues.city,
          price: Number(formValues.price),
          description: formValues.description,
          age: formValues.age,
        });
      }
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^([a-zA-Z ]){2,30}$/;
    if (!values.name) {
      errors.name = "Please enter your name!";
    } else if (!regex.test(values.name)) {
      errors.name = "This is not a valid name";
    }
    if (!values.phone) {
      errors.phone = "Phone Number is required!";
    } else if (values.phone.length > 10) {
      errors.phone = "Please enter a valid phone number!";
    } else if (values.phone.length < 10) {
      errors.phone = "Phone number must be 10 digits";
    }

    if (!values.city) {
      errors.city = "Please enter your city";
    } else if (!regex.test(values.name)) {
      errors.city = "This is not valid";
    }
    if (!values.price) {
      errors.price = "price is required";
    } else if (isNaN(values.price)) {
      errors.price = "Please enter number";
    } else if (values.price.length < 2) {
      errors.price = "Please enter a valid price";
    }
    if (!values.description) {
      errors.description = "A short bio about yourself is required";
    } 
    if (!values.age) {
      errors.age = "Age is required";
    } else if (isNaN(values.age)) {
      errors.age = "Please enter number";
    } 
    return errors;
  };
  return (
    <div className="sample">
      <h1>Share Your Skills</h1>
      <h4>{serviceProvider?.name}</h4>
      <div className="sample__image">
              <img src={serviceProvider?.src} />
            </div>
      <div className="sample__container">
        <div className="sample__heading"></div>
        <div className="sample__center">
          <div className="sample__centerLeft">
            <h1>Be your own boss</h1>
            <strong> {serviceProvider?.email}</strong>
            <p>
              Find jobs in your area that match your skills and schedule. You
              have the freedom and support to be your own boss with Fast Fix.
            </p>
            <p>_________________________________________</p>
            <Button onClick={() => history.push("/TaskerRequestPage")}>My Tasks</Button>
          </div>
          <div className="sample__centerRight">
            <h1>Tell us a little about yourself:</h1>
            <form>
              <h5>Enter your name</h5>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
              <p>{formErrors.name}</p>
              <h5>Enter your phone</h5>
              <input
                type="number"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
              />
              <p>{formErrors.phone}</p>
              <h5>Enter your age</h5>
              <input
                type="number"
                name="age"
                value={formValues.age}
                onChange={handleChange}
              />
              <p>{formErrors.age}</p>
              <h5>Your City</h5>
              <input
                type="text"
                name="city"
                value={formValues.city}
                onChange={handleChange}
              />
              <p>{formErrors.city}</p>
              <h5>Client rate (/hour)</h5>
              <input
                type="text"
                name="price"
                value={formValues.price}
                onChange={handleChange}
              />
              <p>{formErrors.price}</p>
              <h5>Write short bio about yourself</h5>

              <input
                type="text"
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
              <p>{formErrors.description}</p>
            </form>
            <div className="sample__button">
              <button type="submit" onClick={handleSubmit}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sample;
