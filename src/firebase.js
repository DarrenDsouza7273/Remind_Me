// firebase.js
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import { initializeApp } from 'firebase/app';
// // import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyBOZHLUttnveOTMWJLHbFIp5BlhHW3PpLo",
//     authDomain: "remind-me-629.firebaseapp.com",
//     databaseURL: "https://remind-me-629-default-rtdb.firebaseio.com",
//     projectId: "remind-me-629",
//     storageBucket: "remind-me-629.appspot.com",
//     messagingSenderId: "344364352337",
//     appId: "1:344364352337:web:59846e2a5d2c17abb68970"
// };

// // Initialize Firebase
// // if (!firebase.apps.length) {
//     const app = initializeApp(firebaseConfig);
// //}
// export default app;


import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBOZHLUttnveOTMWJLHbFIp5BlhHW3PpLo",
    authDomain: "remind-me-629.firebaseapp.com",
    databaseURL: "https://remind-me-629-default-rtdb.firebaseio.com",
    projectId: "remind-me-629",
    storageBucket: "remind-me-629.appspot.com",
    messagingSenderId: "344364352337",
    appId: "1:344364352337:web:59846e2a5d2c17abb68970"
};

const app = initializeApp(firebaseConfig);

// Access Firestore
// const db = firebase.database();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };