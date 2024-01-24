import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqnoTCKplQox5Ooz11PsCO1UfkkFXvbqA",
  authDomain: "unidate-e5155.firebaseapp.com",
  projectId: "unidate-e5155",
  storageBucket: "unidate-e5155.appspot.com",
  messagingSenderId: "341116520447",
  appId: "1:341116520447:web:c9f2a9eb627845d5fa89ca",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const firestore = getFirestore();

export { app, auth, storage, firestore };
