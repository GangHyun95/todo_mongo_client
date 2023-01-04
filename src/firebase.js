import "firebase/compat/auth";
import firebase from "firebase/compat/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDLn22O_1NaMNFt8PqWMCfdVRBYHCa8zo",
  authDomain: "todo-mongo-56c26.firebaseapp.com",
  projectId: "todo-mongo-56c26",
  storageBucket: "todo-mongo-56c26.appspot.com",
  messagingSenderId: "109726808448",
  appId: "1:109726808448:web:293c47b6953dc98449e965",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
