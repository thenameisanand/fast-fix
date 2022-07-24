import React, { useState, useEffect } from "react";
import "./BookService.css";

import { useParams } from "react-router-dom";
import { db , auth} from "./firebase";
import Taskers from "./Taskers";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import TaskerLogin from "./TaskerLogin";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import './UserDetails.css';
import TaskDescription from './TaskDescription';
function UserDetails() {
    const { taskerId } = useParams();
    const [taskers, setTaskers] = useState([]);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [pincode, setPincode] = useState("");
    const [locality, setLocality] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const [af, setAf] = useState("");
    const [customer, setCustomerData] = useState("");
    
   
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
      const uid = GetUserUid();

      function GetCurrentUser() {
        const [user, setUser] = useState(null);
        const [roomDetails, setRoomDetails] = useState([]);
    
        useEffect(() => {
          auth.onAuthStateChanged((user) => {
            if (user) {
              db.collection("customers")
                .doc(user.uid)
                .get()
              
            } else {
                console.log("NOOOO");
              setUser(null);
            }
          });
        }, []);
        return user;
      }
      const user = GetCurrentUser();
  

    const initialValues = {
        name: "",
        phone: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: "",
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
    console.log(formErrors);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (uid) {
        db.collection("customers")
          .doc(uid)
          .update({
            name: formValues.name,
            phone: formValues.phone,
            pincode: Number(formValues.pincode),
            locality: formValues.locality,
            address: formValues.address,
            city: formValues.city,
            state: formValues.state,
          });
        setFormValues("");
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
    } else if (isNaN(values.phone)) {
      errors.phone = "Enter a number!";
    } else if (values.phone.length < 10) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (!values.pincode) {
      errors.pincode = "Pincode is required!";
    } else if (isNaN(values.pincode)) {
      errors.pincode = "Pincode must be number!";
    }
    if (!values.locality) {
      errors.locality = "Please enter your locality";
    } else if (!regex.test(values.locality)) {
      errors.locality = "This is not valid";
    }
    if (!values.address) {
      errors.address = "Address is required!";
    } else if (!regex.test(values.address)) {
      errors.address = "Please enter a valid address";
    }
    if (!values.city) {
      errors.city = "City is required";
    } else if (!regex.test(values.city)) {
      errors.city = "This is not valid";
    }
    if (!values.state) {
      errors.state = "State is required!";
    } else if (!regex.test(values.state)) {
      errors.state = "Enter a valid state!";
    }
  
   
    return errors;
  };

 
  return (
    <div className="BookService">
      <div className="BookService__containers">
       {uid}
        <h1>Enter your location</h1>
        <div className="BookService__bottom">
          <h1></h1>
          <div className="BookService__bottomLeft">
            <img src="https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"></img>
            <div className="bottomLeft__inputs">
              <h1>{taskers?.name}</h1>
              <h4></h4>
        {user}
              <div className="form__inputs">
                <form>
                  <input
                    type=""
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Name"
                  ></input>{" "}
                  <p>{formErrors.name}</p>
                  <input
                    type=""
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                  ></input>
                  <p>{formErrors.phone}</p>
                  <input
                    type=""
                    name="pincode"
                    value={formValues.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                  ></input>
                  <p>{formErrors.pincode}</p>
                  <input
                    type=""
                    name="locality"
                    value={formValues.locality}
                    onChange={handleChange}
                    placeholder="Locality"
                  ></input>
                  <p>{formErrors.locality}</p>
                </form>

                <div className="form__inputsTwo">
                  <input
                    type=""
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                    placeholder="Address"
                  ></input>
                  <div className="address__validation">
                    <p>{formErrors.address}</p>
                  </div>

                  <div className="form__inputThree">
                    <input
                      type=""
                      name="city"
                      value={formValues.city}
                      onChange={handleChange}
                      placeholder="City"
                    ></input>
                    <div className="city__validation">
                      <p>{formErrors.city}</p>
                    </div>

                    <div className="form__inputFour">
                      <input
                        type=""
                        name="state"
                        value={formValues.state}
                        onChange={handleChange}
                        placeholder="State"
                      ></input>
                      <div className="city__validation">
                        <p>{formErrors.state}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="BookService__bottomLeftTwo">
          <div className="checbox">
            <div className="checbox__middle">
             
              <div className="checbox__below">
                
                <p
                  style={{
                    color: "red",
                    marginLeft: "221px",
                    fontFamily: "monospace",
                  }}
                >
                  
                </p>
              </div>
              <div className="checbox__belowDate">
                <p style={{ color: "red", fontFamily: "monospace" }}>
                </p>
              </div>

              <div className="checbox__date">


              </div>

              <div className="checbox__date">

               
                {af}
              </div>

              <div className="checbox__date">

              </div>
              <div className="savedetails__buttons">
                <Button onClick={handleSubmit}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails