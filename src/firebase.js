/*import 'firebase/auth';

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUSxjPCdeSbnDz8r8CdfJb_m_9KxmXcFE",
  authDomain: "fastfix-2ceb9.firebaseapp.com",
  projectId: "fastfix-2ceb9",
  storageBucket: "fastfix-2ceb9.appspot.com",
  messagingSenderId: "96627976882",
  appId: "1:96627976882:web:d5c0e5ef7f06d1d29137ab"
};

// Initialize Firebase
const app= firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };*/
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAUSxjPCdeSbnDz8r8CdfJb_m_9KxmXcFE",
  authDomain: "fastfix-2ceb9.firebaseapp.com",
  projectId: "fastfix-2ceb9",
  storageBucket: "fastfix-2ceb9.appspot.com",
  messagingSenderId: "96627976882",
  appId: "1:96627976882:web:d5c0e5ef7f06d1d29137ab"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth, storage };