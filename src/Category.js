import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import Services from "./Services";
import CategoryOption from "./CategoryOption";
import "./Category.css";
import TaskerHomePage from './TaskerHomePage';
import { Button } from "@material-ui/core";

function Category() {
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");

  const { categoryId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomServices, setRoomServices] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categoryId) {
      db.collection("categories")
        .doc(categoryId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }

    db.collection("categories").orderBy("name", "asc").onSnapshot((snapshot) =>
      setCategories(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }
        ))
      )
    );

    db.collection("categories")
      .doc(categoryId)
      .collection("services")
      .orderBy("title", "asc")
      .onSnapshot((snapshot) =>
        setRoomServices(snapshot.docs.map((doc) => doc.data()))
      );
  }, [categoryId]);

  const submit = () => {
    if (categoryId) {
      db.collection("categories")
      .doc(categoryId)
      .collection("service")
      .add({
        name: name,
      })
    }
  };
  return (
    <div className="category">
      <div className="category_info">
        {categories.map((channel) => (
          <CategoryOption name={channel.name} id={channel.id} />
        ))}
         <input
          type="text"
          placeholder="Search by service!"
          className="search_button"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></input>
      </div>

      <div className="category_container">
        <h1>{roomDetails?.name}</h1>
      
      </div>
     
     
      {roomServices.filter(({ title }) => {
          if (searchTerm === "") {
              return title;
          } else if (
            title.toLowerCase().includes(searchTerm.toLocaleLowerCase())

          ) {
              return title;
          } 
          
        })
          .map(({ id, src, location, title, description, price }) => (
        <Services
          id={id}
          src={src}
          location={location}
          title={title}
          description={description}
          price={price}
          star={4.73}

        />
      ))}
     
    </div>
  );
}

export default Category;