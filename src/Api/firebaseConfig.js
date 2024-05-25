// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCte8otsfO04RRxSDDc7VKQVSleeDNa0a0",
  authDomain: "rentify-49bff.firebaseapp.com",
  projectId: "rentify-49bff",
  storageBucket: "rentify-49bff.appspot.com",
  messagingSenderId: "74863823957",
  appId: "1:74863823957:web:fc8d26c08219eaac3bd8dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)