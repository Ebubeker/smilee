import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdL1fwNTLKfA0OJJqKeZFqYM-6VQY6eHw",
  authDomain: "smilee-83d61.firebaseapp.com",
  projectId: "smilee-83d61",
  storageBucket: "smilee-83d61.appspot.com",
  messagingSenderId: "481949975437",
  appId: "1:481949975437:web:3795ec48e2ea171ef7b3c4",
  measurementId: "G-LH277SKWKJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
