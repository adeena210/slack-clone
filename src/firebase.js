import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {sendPasswordResetEmail, signOut } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp-sWV8n1xSMV6Z3UR_rczdgccQ3ztrM4",
  authDomain: "slack-clone-a4bdc.firebaseapp.com",
  projectId: "slack-clone-a4bdc",
  storageBucket: "slack-clone-a4bdc.appspot.com",
  messagingSenderId: "284009604520",
  appId: "1:284009604520:web:7cf54efa8790ae60f3699d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);



export const authlistener = onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
      
  }
});


export const PasswordResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


