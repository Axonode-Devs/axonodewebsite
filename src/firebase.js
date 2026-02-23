import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAB0MEW3eUnT44v9AA82pYTf3Zi22ylF3k",
  authDomain: "axonode-6be56.firebaseapp.com",
  projectId: "axonode-6be56",
  storageBucket: "axonode-6be56.firebasestorage.app",
  messagingSenderId: "148846928384",
  appId: "1:148846928384:web:58c1c488684d2f53b62ee5",
  measurementId: "G-KERZ3CC63C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);