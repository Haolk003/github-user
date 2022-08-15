// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_B4E5AB7JDxMdGl885dx6A9Ct-yxywaU",
  authDomain: "github-user-df029.firebaseapp.com",
  projectId: "github-user-df029",
  storageBucket: "github-user-df029.appspot.com",
  messagingSenderId: "727734658836",
  appId: "1:727734658836:web:155a24cbb5f37cc0b20401",
  measurementId: "G-87STQYRNQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
export {app,auth};