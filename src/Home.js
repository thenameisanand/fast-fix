import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import "./Home.css";
import Banner from "./Banner";
import Card from "./Card";
import HomeCard from "./HomeCard";
import { db } from "./firebase";

function Home() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    db.collection("services").onSnapshot((snapshot) =>
      setServices(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);
  return (
    <div className="home">
      <Banner />

      <HomeCard />

      <div className="title">
        <h1>Featured Tasks</h1>
      </div>

      <div className="home__section">
      
        <Card
          id="12321341"
          src="https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
          title="Furniture Assembly"
          description="Unique activities we can do together, led by a world of hosts."
          price={45}
        />
        <Card
          id="49538094"
          src="https://www.msgfacility.com/wp-content/uploads/2020/08/Gardening-Services.png"
          title="Yard Work Services"
          description="Unique activities we can do together, led by a world of hosts."
          price={50}
        />
        <Card
          id="3"
          src="https://images.unsplash.com/photo-1592365559101-19adfefdf294?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          title="Car Washing"
          description="Unique activities we can do together, led by a world of hosts."
          price={50}
        />
        <Card
          id="4"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          title="Office Administration"
          description="Unique activities we can do together, led by a world of hosts."
          price={65}
        />
      </div>
      <div className="title">
        <h1>Shopping + Delivery</h1>
      </div>

      <div className="home__section">
        <Card
          id="9"
          src="https://assets.gqindia.com/photos/6070617423780a7fa9a3ec07/master/pass/Online%20grocery%20services.jpeg"
          title="Grocery Shopping & Delivery"
          description="Unique activities we can do together, led by a world of hosts."
          price={500}
        />
        <Card
          id="10"
          src="https://arriival.com/wp-content/uploads/2019/05/satisfied.jpg"
          title="Delivery Service"
          description="Unique activities we can do together, led by a world of hosts."
          price={500}
        />
        <Card
          id="11"
          src="https://files.list.co.uk/images/2020/11/27/list-2-LST409858.jpg"
          title="Pet Food Delivery"
          description="Unique activities we can do together, led by a world of hosts."
          price={500}
        />

        <Card
          id="12"
          src="https://images.unsplash.com/photo-1597178380795-38c56a1a7053?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=875&q=80"
          title="Baby Food Delivery"
          description="Unique activities we can do together, led by a world of hosts."
          price={500}
        />
      </div>
      <div className="title">
        <h1>General Cleaning</h1>
      </div>

      <div className="home__section">
        <Card
          id="5"
          src="https://2greenchicks.com/wp-content/uploads/2017/11/shutterstock_657213997.jpg"
          title="House Cleaning Service"
          description="Unique acti  vities we can do together, led by a world of hosts."
          price={25}
        />
        <Card
          id="6"
          src="https://images.unsplash.com/photo-1592365559101-19adfefdf294?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          title="Car Washing"
          description="Unique activities we can do together, led by a world of hosts."
          price={50}
        />

        <Card
          id="7"
          src="https://tidytimesaver.com/app/uploads/2017/10/Tidy-Time-Saver-Garage-Cleaning.jpg"
          title="Garage Cleaning"
          description="Unique activities we can do together, led by a world of hosts."
          price={75}
        />
        <Card
          id="8"
          src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_160926937_970647970450031_50806.jpg"
          title="Personal Assistant"
          description="Unique activities we can do together, led by a world of hosts."
          price={15}
        />
      </div>
     
      <div className="title">
        <h1>Yardwork Services</h1>
      </div>
      <div className="home__section">
        <Card
          id="13"
          src="https://empire-s3-production.bobvila.com/articles/wp-content/uploads/2018/08/Pulling_Weeds.jpg"
          title="Weed Removal"
          description="Unique activities we can do together, led by a world of hosts."
          price={500}
        /> 
        <Card
          id="14"
          src="https://cdn.pixabay.com/photo/2016/11/09/22/17/lawn-1812944_960_720.jpg"
          title="Lawn Care Services"
          description="Unique activities we can do together, led by a world of hosts."
          price={500}
        />
        <Card
          id="15"
          src="https://media.istockphoto.com/photos/man-cutting-trees-using-an-electrical-chainsaw-and-professional-picture-id470746249?k=20&m=470746249&s=612x612&w=0&h=ykXzfebfVpdoJBUDzcFCa5N1Aj3fElnfwMxc66neVO8="
          title="Tree Trimming Service"
          description="Unique activities we can do together, led by a world of hosts."
          price={500}
        />

        <Card
          id="16"
          src="data:image/jpeg;base64,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"
          title="Lawn Fertilizer Service"
          description="Unique activities we can do together, led by a world of hosts."
          price="£350/night"
        />
      </div>
      <div className="home__section">
        <Card
          id="17"
          src="https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
          title="Furniture Assembly"
          description="Unique activities we can do together, led by a world of hosts."
          price="£350/night"
        />
        <Card
          id="18"
          src="https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
          title="Furniture Assembly"
          description="Unique activities we can do together, led by a world of hosts."
          price="£350/night"
        />
        <Card
          id="19"
          src="https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
          title="Furniture Assembly"
          description="Unique activities we can do together, led by a world of hosts."
          price="£350/night"
        />

        <Card
          id="20"
          src="https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
          title="Furniture Assembly"
          description="Unique activities we can do together, led by a world of hosts."
          price="£350/night"
        />
      </div>
      <div className="title">
        <h1>Home Cleaning</h1>
      </div>
      <div className="home__section">
        <Card
          id="21"
          src="https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
          title="Furniture Assembly"
          description="Unique activities we can do together, led by a world of hosts."
          price="£350/night"
        />
        <Card
          id="22"
          src="https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
          title="Furniture Assembly"
          description="Unique activities we can do together, led by a world of hosts."
          price="£350/night"
        />

        <Card
          id="23"
          src="https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
          title="Furniture Assembly"
          description="Unique activities we can do together, led by a world of hosts."
          price="£350/night"
        />
        <Card
          id="24"
          src="https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
          title="Furniture Assembly"
          description="Unique activities we can do together, led by a world of hosts."
          price="£350/night"
        />
      </div>
      <div className="home__bottom">
        <div className="bottom__container">
        <p>_____________________________</p>
        <h1>Featured Taskers </h1>
        </div>
        <div className="bottom__card">
        
         
       
       
          </div>
      </div>
    </div>
  );
}

export default Home;
