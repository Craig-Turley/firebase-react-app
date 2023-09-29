import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Auth functions
import React, { useState, useEffect } from "react"; // Import React and useState, useEffect


const firebaseConfig = {
  apiKey: "AIzaSyDQVbOIF8m82VWZ-4Aj2YSZEpvmxDxNYCU",
  authDomain: "fir-project-1ecb6.firebaseapp.com",
  projectId: "fir-project-1ecb6",
  storageBucket: "fir-project-1ecb6.appspot.com",
  messagingSenderId: "317263241109",
  appId: "1:317263241109:web:85aed10366148729d5209c",
  measurementId: "G-GNLFG6CWME"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);;

function App() {

  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  // Check if user is logged in
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const dataCollection = collection(db, "users"); // Corrected variable name
        const querySnapshot = await getDocs(dataCollection); // Corrected function name
        const newData = [];
        querySnapshot.forEach((doc) => {
          newData.push({ id: doc.id, ...doc.data() });
        });
        setData(newData);
      };

      fetchData();
    }
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <p>Welcome, {user.displayName}!</p>
      ) : (
        <p>Please sign in.</p>
      )}

      <ul>
        {data.map((item) => {
          <li key={item.id}>{item.name}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
