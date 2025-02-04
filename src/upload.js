// src/uploadData.js
import { collection, addDoc } from "firebase/firestore";
import db from "./firebaseConfig.js";
import jsonData from "./finease.json" assert { type: 'json' }; // Place your JSON file in src folder

const uploadData = async () => {
  try {
    const userRef = collection(db, "users"); // 'users' is the collection name
    await addDoc(userRef, jsonData);
    console.log("Data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading data: ", error);
  }
};

uploadData();
