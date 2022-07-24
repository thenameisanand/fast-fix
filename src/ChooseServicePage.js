import React, { useState, useEffect } from "react";
import { storage, auth, db } from "./firebase";
import { useParams } from "react-router-dom";
import "./ChooseServicePage.css";
import { useHistory } from "react-router-dom";
import Admin from "./Admin";
import { Button } from "@material-ui/core";

function DemoAddService() {
  const history = useHistory();

  const [categoryData, setCategoryData] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];

  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("YESS",user)
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
  useEffect(() => {
    db.collection("services")
      .orderBy("title", "asc")
      .onSnapshot((snapshot) => {
        setCategoryData(
          snapshot.docs.map((doc) => ({
            serviceId: doc.id,
            title: doc.data().title,
          }))
        );
      });
  }, []);
  useEffect(() => {
    if (serviceId) {
      db.collection("services")
        .doc(serviceId)
        .onSnapshot((snapshot) => setCategoryName(snapshot.data()));
    }
  });
  const select = (serviceId) => {
    if (serviceId) {
      history.push(`/taskersignup/${serviceId}`);
    }
  };
  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError("");
      } else {
        setImage(null);
        setImageError("please select a valid image file type (png or jpg)");
      }
    } else {
      console.log("please select your file");
    }
  };

  const handleAddProducts = (e) => {
    e.preventDefault();
    // console.log(title, description, price);
    // console.log(image);
    const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => setUploadError(error.message),
      () => {
        storage
          .ref("product-images")
          .child(image.name)
          .getDownloadURL()
          .then((src) => {
     
            db.collection("ServiceProviders")
              .doc(uid)
              .update({
                src,
              })
              .then(() => {
                setSuccessMsg("Image uploaded successfully");
                document.getElementById("file").value = "";
                setImageError("");
                setUploadError("");
                setTimeout(() => {
                  setSuccessMsg("");
                }, 200);
              })
              .catch((error) => setUploadError(error.message));
          });
      }
    );
  };
  useEffect(() => {
    if (uid) {
      db.collection("ServiceProviders")
        .doc(uid)
        .onSnapshot((snapshot) => setCategoryData(snapshot.data()));
    }
  });
  
  return (
    <div className="selectCategory">
      <p>
        <img title="Update profile picture " src={categoryData?.src}></img>
      </p>
  
      {user}
      <div className="selectCategory__container">
        <div className="middle__portion">
          <div className="selectCategory__middle">
            {user}
            {imageError && (
              <>
                <br></br>
                <div className="error-msg">{imageError}</div>
              </>
            )}
            <form
              autoComplete="off"
              className="form-group"
              onSubmit={handleAddProducts}
            >
              <input
                type="file"
                id="file"
                className="form-control"
                required
                onChange={handleProductImg}
              ></input>
              <button type="submit" className="btn btn-success btn-md">
                Upload
              </button>
            </form>
            {uploadError && (
              <>
                <br></br>
                <div className="error-msg">{uploadError}</div>
              </>
            )}

            <h4>Upload your profile picture</h4>

<br></br>
<Button onClick={() => history.push("/taskerhomepage")}>Continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoAddService;
