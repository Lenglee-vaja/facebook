// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
// import { FacebookAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyCmuJ9T_b0Mfwe950gsYSy1pnzV2GXm4PE",
//     authDomain: "auth-facebook-54693.firebaseapp.com",
//     projectId: "auth-facebook-54693",
//     storageBucket: "auth-facebook-54693.appspot.com",
//     messagingSenderId: "874856560243",
//     appId: "1:874856560243:web:8abb1737ce8cc058609c06"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);

// const provider = new FacebookAuthProvider();
// provider.addScope("email"); // Add the 'email' scope to retrieve the user's email
// //provider.addScope("user_phone_number"); // Add the 'user_phone_number' scope to retrieve the user's phone number

// export { auth, provider }

import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
        apiKey: "AIzaSyCmuJ9T_b0Mfwe950gsYSy1pnzV2GXm4PE",
        authDomain: "auth-facebook-54693.firebaseapp.com",
        projectId: "auth-facebook-54693",
        storageBucket: "auth-facebook-54693.appspot.com",
        messagingSenderId: "874856560243",
        appId: "1:874856560243:web:8abb1737ce8cc058609c06"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Create Facebook and Google auth providers
const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope("email"); // Add the 'email' scope to retrieve the user's email

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email")

export { auth, facebookProvider, googleProvider };
