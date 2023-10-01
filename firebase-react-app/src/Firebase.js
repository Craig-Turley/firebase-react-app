import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQVbOIF8m82VWZ-4Aj2YSZEpvmxDxNYCU",
  authDomain: "fir-project-1ecb6.firebaseapp.com",
  projectId: "fir-project-1ecb6",
  storageBucket: "fir-project-1ecb6.appspot.com",
  messagingSenderId: "317263241109",
  appId: "1:317263241109:web:85aed10366148729d5209c",
  measurementId: "G-GNLFG6CWME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

