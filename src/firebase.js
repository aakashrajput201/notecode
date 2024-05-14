// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPVXZySQ_ftvWP9-vZEFm5GBf74SS4WK4",
  authDomain: "code-sharing-app-98c74.firebaseapp.com",
  projectId: "code-sharing-app-98c74",
  storageBucket: "code-sharing-app-98c74.appspot.com",
  messagingSenderId: "387915490144",
  appId: "1:387915490144:web:5c3cc9908f6c8d82783405"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


