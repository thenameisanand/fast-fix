import React, { useState, useEffect } from "react";
import TaskerDetails from "./TaskerDetails";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import './ChooseServicePage.css';
import { useHistory } from "react-router-dom";

function StatusPage() {
  const { taskerId } = useParams();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const [taskers, setTaskers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [request, setRequest] = useState("");
  useEffect(() => {
    if (taskerId) {
      db.collection("ServiceProviders")
        .doc(taskerId)
        .onSnapshot((snapshot) => setTaskers(snapshot.data()));
    }
  });

  useEffect(() => {
    if (taskerId) {
      db.collection("ServiceProviders")
        .doc(taskerId)
        .collection("ServiceRequests")
        .orderBy("date", "asc")
        .onSnapshot((snapshot) =>
          setChannels(
            snapshot.docs.map((doc) => ({
              requestId: doc.id,
              name: doc.data().name,
              date: doc.data().date,
              address: doc.data().address,
              time: doc.data().time,
              date: doc.data().date,
              pincode: doc.data().pincode,
              phone: doc.data().phone,
            }))
          )
        );
    }
  }, [taskerId]);
  const select = (requestId) => {
    if (requestId) {
      history.push(`/statusdetails/${requestId}`);

      console.log(requestId)
    }
  }
  return (
    <div>
      <div className="selectCategory__container">
        <div className="middle__portion">
          <div className="selectCategory__middle">
       
           
            <form
              autoComplete="off"
              className="form-group"
              onSubmit=""
            >
              <select
              value={request}
              onChange={(e) => setRequest(e.target.value)}
             
             >
                {channels
                .filter(({phone}) => {
                  if (searchTerm === "") {
                    return phone;
                  } else if (
                    phone.toLowerCase().includes(searchTerm.toLocaleLowerCase())

                  
                  ) {
                    return phone;
                  }
                })
                .map(({requestId, name}) => (
                  <option key={requestId}
                  onClick={()=>{select(requestId)}}
                  >{name}</option>
                ))
                }
              </select>
              <input
            type="text"
            placeholder="Search by Location!"
            className="SearchButton__class"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></input>
              
            </form>
            

            <h4>Upload your profile picture</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusPage;
