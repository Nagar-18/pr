import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAF4wp3FTZ-RUJMcMqOTMT5Zalo9xylMEA",
  authDomain: "pritam-37b23.firebaseapp.com",
  projectId: "pritam-37b23",
  storageBucket: "pritam-37b23.appspot.com",
  messagingSenderId: "156952757092",
  appId: "1:156952757092:web:9d41dee4d9d78fb1d8f071",
  measurementId: "G-E468XKC4X3",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
