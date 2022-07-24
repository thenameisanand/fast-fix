import React, { useState } from "react";
import { db } from "./firebase";
import { useStateValue } from './StateProvider';
import firebase from "firebase";

function Sample({ channelName, channelId }) {
  const [name, setName] = useState("");
  const [src, setSrc] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");


  const sendMessage = (e) => {
    e.preventDefault();
    console.log(typeof channelName);
    console.log(typeof categoryId);
    if (channelId) {
      db.collection("categories").doc(channelId).collection("DD").add({
        name: name,
        src: src,
        title: title,
        description: description,
        price: price,
        
      });
    }
    setName("");
    setSrc("");
    setTitle("");
    setDescription("");
    setPrice("");
  };

  return (
    <div className="chatInput">
      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
         
        />
         <input
          value={src}
          onChange={(e) => setSrc(e.target.value)}
        
        />
         <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
         
        />
         <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
         
        />
         <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
         
        />
        <button type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default Sample;