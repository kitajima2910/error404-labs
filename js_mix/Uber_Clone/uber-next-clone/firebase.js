// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXA5wcnb2XqH5UW4MWwz6-BiUNFuCrK5M",
    authDomain: "uber-next-clone-live-9ef21.firebaseapp.com",
    projectId: "uber-next-clone-live-9ef21",
    storageBucket: "uber-next-clone-live-9ef21.firebasestorage.app",
    messagingSenderId: "910693040936",
    appId: "1:910693040936:web:501143b2d11e375f05c61d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };
