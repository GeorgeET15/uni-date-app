import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBclRv9SxQqh6C93vrSIbnZdqcu-oDwRzo",
  authDomain: "unidate-7fdf0.firebaseapp.com",
  projectId: "unidate-7fdf0",
  storageBucket: "unidate-7fdf0.appspot.com",
  messagingSenderId: "57797129447",
  appId: "1:57797129447:web:409701adc2e007810d9e42",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const firestore = getFirestore();

export { app, auth, storage, firestore };
