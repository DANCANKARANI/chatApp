
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAVisy2AeOMof5irMPufj7tpCazfBiXMH8",
  authDomain: "chat-f427d.firebaseapp.com",
  projectId: "chat-f427d",
  storageBucket: "chat-f427d.appspot.com",
  messagingSenderId: "171774493052",
  appId: "1:171774493052:web:38964ed5f2c384e9f9a4f9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db=getFirestore()