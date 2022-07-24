import React, { useState, useEffect } from "react";
import "./TaskDescription.css";
import { useHistory } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";

import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { db, auth } from "./firebase";
import { Button } from "@material-ui/core";
import Taskers from "./Taskers";
import Review from "./Review";
import BookService from "./BookService";
import "./Review.css";
function TaskDescription({ id }) {
  const { taskerId } = useParams();
  const [taskers, setTaskers] = useState([]);
  const [details, setDetails] = useState("");
  const [ratings, setRatings] = useState([]);
  const [review, setReview] = useState([]);
  const [error, setError] = useState("");
  const [customers, setCustomers] = useState("");
  const [ratingsError, setRatingsError] = useState("");
  const [show, setShow] = useState(false);
  const [TotalReviews, setTotalReviews] = useState(0);

  const history = useHistory();

  useEffect(() => {
    if (taskerId) {
      db.collection("ServiceProviders")
        .doc(taskerId)
        .collection("reviews")
        .get()
        .then((querySnapshot) => {
          const TotalReviews = querySnapshot.size;
          setTotalReviews(TotalReviews);
        });
    }
  }, [taskerId]);
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
          db.collection("customers").doc(user.uid).get();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const user = GetCurrentUser();
  const uid = GetUserUid();

  const selectCategory = () => {
    if (taskers?.activeStatus == "OFFLINE") {
      setShow(true);
    } else if (taskerId) {
      history.push(`/bookservice/${taskerId}`);
    }
  };
  useEffect(() => {
    if (taskerId) {
    db.collection("ServiceProviders")
      .doc(taskerId)
      .collection("reviews")
      .onSnapshot((snapshot) =>
        setReview(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [taskerId]);
  useEffect(() => {
    if (uid) {
      db.collection("customers")
        .doc(uid)
        .onSnapshot((snapshot) => setCustomers(snapshot.data()));
    }
  });
  const submitReview = (e) => {
    e.preventDefault();

    if (taskerId) {
      db.collection("ServiceProviders")
        .doc(taskerId)
        .collection("reviews")
        .add({
          details: details,
          ratings: ratings,
          customer: customers?.name,
          customerEmail: customers?.email,
        })
        .then(() => {
          setDetails("");
          setRatings("");
        });
    }
  };
  useEffect(() => {
    if (taskerId) {
      db.collection("ServiceProviders")
        .doc(taskerId)
        .onSnapshot((snapshot) => setTaskers(snapshot.data()));
    }
  });

  const alreadyBooked = (e) => {
    e.preventDefault();
    if (taskerId) {
      history.push(`/bookings`);
    } else {
      history.push(`/servicestatus/${taskerId}`);
    }
  };
const addToWishList = (e) => {
  e.preventDefault();
  if (uid) {
    db.collection("customers")
    .doc(uid) 
    .collection("wishList")
    .add({
      name: taskers?.name,
      src: taskers?.src,
      price: taskers?.price,
      service: taskers?.service,
      tasId: taskerId,
    })
  }
  console.log("WISH LIST")
}
  const Validation = () => {
    let isValid = true;
    if (ratings.length > 5) {
      isValid = false;
      setError("ratings must be less than 5");
    } else if (ratings.length < 1) {
      isValid = false;
      setError("ratings must be greater than 1");
    }
    return isValid;
  };
  const initialValues = {
    details: details,
    ratings: ratings,
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
      if (taskerId) {
        db.collection("ServiceProviders")
          .doc(taskerId)
          .collection("reviews")
          .add({
            details: formValues.details,
            ratings: formValues.ratings,
            customer: customers?.name,
            customerEmail: customers?.email,
          });
      }
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^([a-zA-Z ]){2,30}$/;
    if (!values.details) {
      errors.details = "Please enter your name!";
    } else if (!regex.test(values.details)) {
      errors.details = "This is not a valid name";
    }
    if (!values.ratings.length > 7) {
      errors.ratings = "ratings Number is required!";
    } else if (values.ratings > 5) {
      errors.ratings = "Ratings should be below 5";
    } else if (values.ratings < 1) {
      errors.ratings = "Ratings should be above 1";
    } else if (isNaN(values.ratings)) {
      errors.ratings = "Please enter number";
    }
    return errors;
  };
  return (
    <div className="description">
      <div className="description__container">
        <div className="description__left">
          <img src={taskers?.src}></img>
          {customers?.email}
          {uid}
        </div>
        <div className="description__right">
          <h1>{taskers?.name}</h1>
          <div className="description__rightService">
            <h3>{taskers?.service}</h3>
            <h3>₹{taskers?.price}/hr</h3>
            <FaHeart
            onClick={addToWishList}
              title="Add to wishlist"
              style={{ marginTop: "23px", color: "red", cursor: "pointer" }}
            />
          </div>
          <strong style={{ color: "green", cursor: "pointer" }}>
            {TotalReviews} Reviews
          </strong>

          <p>{taskers?.description}</p>
          <div className="description__upperButton">
            <Button
              style={{ color: "green" }}
              className="button__a"
              
            >
              {taskers?.activeStatus}
            </Button>

            <div className="description__lowerButton">
              <Button onClick={selectCategory}>Book Now</Button>
            </div>
            {show ? (
              <div>
                <Button style={{ color: "red" }}>
                  This Tasker is OFFLINE!{" "}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="description__button">
        <h2>Reviews</h2>
        <div className="review__container">
          <div className="review__top">
            <img src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
          </div>
          <div className="review__bottom">
            <input
              placeholder="Share details of your experience.."
              value={formValues.details}
              onChange={handleChange}
              type="text"
              name="details"
            ></input>
            <input
              style={{ marginLeft: "10px" }}
              value={formValues.ratings}
              onChange={handleChange}
              placeholder="Enter ratings"
              type="text"
              name="ratings"
            ></input>
            <Button onClick={handleSubmit}>Subscribe</Button>
          </div>
        </div>
        <p style={{ color: "red" }}>{formErrors.ratings}</p>
        <p style={{ color: "red" }}>{formErrors.details}</p>

        <p></p>
      </div>
    </div>
  );
}

export default TaskDescription;
