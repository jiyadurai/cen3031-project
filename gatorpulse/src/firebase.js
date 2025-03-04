// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM7A8WVrLyGCNM7bdPLs9Fq73sFL8th10",
  authDomain: "gatorpulse-6be77.firebaseapp.com",
  projectId: "gatorpulse-6be77",
  storageBucket: "gatorpulse-6be77.firebasestorage.app",
  messagingSenderId: "243490286602",
  appId: "1:243490286602:web:599c09e8610c7f4450c3f3",
  measurementId: "G-49158VXYPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, collection, addDoc };