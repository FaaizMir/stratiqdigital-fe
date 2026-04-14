// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTlc7rl7A8liKe7Jf19oI8EtKktGhs_Jk",
  authDomain: "stratiqdigital-sourcing.firebaseapp.com",
  projectId: "stratiqdigital-sourcing",
  storageBucket: "stratiqdigital-sourcing.firebasestorage.app",
  messagingSenderId: "4796235010",
  appId: "1:4796235010:web:f82c4c6cb30e588cdb961b",
  measurementId: "G-80CHPEWW97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  getAnalytics(app);
}

// Export Firestore and Auth instances
export const db = getFirestore(app);
export const auth = getAuth(app);

export const saveQuoteRequest = async (payload) => {
  const quoteCollection = collection(db, "quoteRequests");
  const docRef = await addDoc(quoteCollection, {
    ...payload,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};