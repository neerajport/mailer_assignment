import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// process.env.REACT_KEY_FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyA5QH_YBEn2cHWtS3Cn3idSczUm7ZUiH_s",
    authDomain: "admin-userform.firebaseapp.com",
    projectId: "admin-userform",
    storageBucket: "admin-userform.appspot.com",
    messagingSenderId: "477078902080",
    appId: "1:477078902080:web:c36c4392e42176ad7316a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
