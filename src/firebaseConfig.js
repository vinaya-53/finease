// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC5LOmIud9b1E-o37-smAq4icJcudamUDY",
    authDomain: "finease-85f69.firebaseapp.com",
    projectId: "finease-85f69",
    storageBucket: "finease-85f69.firebasestorage.app",
    messagingSenderId: "337686169805",
    appId: "1:337686169805:web:443b6966c2a67d427c0184",
    measurementId: "G-4XMX67X7NZ"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
