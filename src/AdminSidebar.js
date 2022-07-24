import React, {useState, useEffect } from 'react'
import './AdminPage.css';
import './AdminSidebar.css';
import { auth, db } from "./firebase";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { MdOutlineDashboard } from 'react-icons/md';
import AdminTaskers from './AdminTaskers';
function AdminSidebar({user}) {
    const history = useHistory();
    const [admin, setAdmin] = useState([]);

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
    useEffect(() => {
      if (uid) {
        db.collection("admin")
          .doc(uid)
          .onSnapshot((snapshot) => setAdmin(snapshot.data()));
      }
    });
const newDivision = () => {
  <AdminTaskers/>
}
  return (
    <div className="adminPage__Left">
    <div className="adminPage__LeftDetails">
<img title='update profile picture' src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"></img>
      <h1>{admin?.FullName}</h1>
    </div>
    <h5>{admin?.Email}</h5>

    <div className="LeftDetails__Two">

      <h4 onClick={() => history.push('/adminpage')}><MdOutlineDashboard/>Dashboard</h4>            
      <h4 onClick={() => history.push('/admincategory')}>Categories</h4>
      <h4 onClick={() => history.push('/adminallservices')}>Services</h4>
      <h4 onClick={() => history.push('/admintaskers')}>Taskers</h4>
      <h4>Reviews</h4>
      <h4 onClick={newDivision}>My Profile</h4>
    </div>
  </div>
  )
}

export default AdminSidebar