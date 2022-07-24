import React, { useState, useEffect } from "react";
import "./BookService.css";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import Taskers from "./Taskers";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import TaskerLogin from "./TaskerLogin";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
function DescribeTask() {
    const { serviceId } = useParams();
  const { taskerId } = useParams();
  const [taskers, setTaskers] = useState([]);
const [service, setService] = useState("");
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
  const [{ user }] = useStateValue();
  useEffect(() => {
    if (taskerId) {
      db.collection("ServiceProviders")
        .doc(taskerId)
        .onSnapshot((snapshot) => setTaskers(snapshot.data()));
    }
  });
useEffect(() => {
    db.collection("services")
    .doc(serviceId)
    .onSnapshot((snapshot) => setService(snapshot.data()));
})
  const initialValues = {
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    description: "",
    userImage: "",
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
     db.collection('serviceReq')
     .add({
        name: formValues.name,
        phone: formValues.phone,
        pincode: Number(formValues.pincode),
        locality: formValues.locality,
        address: formValues.address,
        city: formValues.city,
        price: Number(formValues.price),
        description: formValues.description,
        state: formValues.state,
        date: formValues.date,
        time: formValues.time,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    service: service?.title,
    })
        if (taskerId) {
        db.collection("ServiceProviders")
          .doc(taskerId)
          .collection("ServiceRequests")
          .add({
            user: user.uid,

            name: formValues.name,
            phone: formValues.phone,
            pincode: Number(formValues.pincode),
            locality: formValues.locality,
            address: formValues.address,
            city: formValues.city,
            price: Number(formValues.price),
            description: formValues.description,
            state: formValues.state,
            date: formValues.date,
            time: formValues.time,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
    if (!values.description) {
      errors.description = "A short details about your task is required";
    }
    if (!values.date) {
      errors.date = "Enter date!";
    }
    if (!values.time) {
      errors.time = "Enter time!";
    }
    return errors;
  };

  return (
    <div className="BookService">
      <div className="BookService__container">
        <div className="BookService__containerMiddle">
          <h1>Describe Your Task</h1>
          <div className="containerMiddle__p">
            <h2>{service?.title}</h2>
            <p>Scroll to begin</p>
            {serviceId}
            <h1>
              <FaLongArrowAltDown />
            </h1>
          </div>
          <div className="socialMedia__icons">
            <p>
              <FaFacebookF />
            </p>
            <p>
              <FaPinterestP />
            </p>
            <p>
              <FaTwitter />
            </p>
          </div>
        </div>
        <h1></h1>
        <br></br>
        <div className="BookService__bottom">
          <h1></h1>
          <div className="BookService__bottomLeft">
            <img src=""></img>
            <div className="bottomLeft__inputs">
              <h1>{taskers?.name}</h1>
              <h4>Your Task Location</h4>
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
            <h4>Task Options</h4>
            <h2></h2>
            <p>________</p>
            <div className="checbox__middle">
              <div className="checbox__below">
                <h4>Tell us the details of your task</h4>
                <input
                  name="description"
                  onChange={handleChange}
                  placeholder="Tell us what you need done, when and where it works for you."
                  type="text"
                ></input>
                <p
                  style={{
                    color: "red",
                    marginLeft: "221px",
                    fontFamily: "monospace",
                  }}
                >
                  {formErrors.description}
                </p>
              </div>
              <div className="checbox__belowDate">
                <h4>Date</h4>
                <input type="date" name="date" onChange={handleChange}></input>
                <p style={{ color: "red", fontFamily: "monospace" }}>
                  {formErrors.date}
                </p>
              </div>

              <div className="checbox__date">
                <h4>Time of day</h4>

                <input onChange={handleChange} name="time" type="time"></input>
              </div>

              <div className="checbox__date">{af}</div>

              <div className="checbox__date"></div>
              <div className="savedetails__button">
                <Button onClick={handleSubmit}>Send Request</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescribeTask;
