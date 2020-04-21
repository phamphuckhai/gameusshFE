import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAxcjgaYVOnANmfOewIpJxVlyhBVkzhMQU",
    authDomain: "webappussh.firebaseapp.com",
    databaseURL: "https://webappussh.firebaseio.com",
    projectId: "webappussh",
    storageBucket: "webappussh.appspot.com",
    messagingSenderId: "68911637712",
    appId: "1:68911637712:web:844f40b9d40bbcbfa6ead5",
    measurementId: "G-5MB03BWT50"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
  export const auth = firebase.auth();
  export const db = firebase.firestore();

  

  export default firebase