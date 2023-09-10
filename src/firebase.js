// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo58--iRdZzY3QQ2q8tejDAHe4U4RahCQ",
  authDomain: "chatapp-e039f.firebaseapp.com",
  projectId: "chatapp-e039f",
  storageBucket: "chatapp-e039f.appspot.com",
  messagingSenderId: "291069579496",
  appId: "1:291069579496:web:a04a99e7c3d0922776395d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)