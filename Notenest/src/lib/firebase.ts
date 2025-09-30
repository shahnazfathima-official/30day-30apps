import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZBDEiC1nV5P7ACfYrjQ7rFMQDHtQNrdU",
  authDomain: "notenest-bc4cb.firebaseapp.com",
  projectId: "notenest-bc4cb",
  storageBucket: "notenest-bc4cb.firebasestorage.app",
  messagingSenderId: "145002198807",
  appId: "1:145002198807:web:bf01b52ef7340a0b506952"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{db};