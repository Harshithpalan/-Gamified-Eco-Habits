// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyykaxxm5xnh5Z5mmkPQjoFc9mlD8JIyw",
    authDomain: "gamified-eco-habits.firebaseapp.com",
    projectId: "gamified-eco-habits",
    storageBucket: "gamified-eco-habits.firebasestorage.app",
    messagingSenderId: "398856350131",
    appId: "1:398856350131:web:31ff3e81fea8431f93c3c6"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
