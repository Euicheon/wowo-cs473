import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig  = {
    apiKey: "AIzaSyABT6_9hUpFXDFyIcPP-0BughuUygsVNyw",
    authDomain: "wowo-cs473.firebaseapp.com",
    databaseURL: "https://wowo-cs473.firebaseio.com",
    projectId: "wowo-cs473",
    storageBucket: "wowo-cs473.appspot.com",
    messagingSenderId: "27132694397",
    appId: "1:27132694397:web:b0a40d962ba53488ff8614",
    measurementId: "G-S0YXCKXKYH"
};

firebase.initializeApp(firebaseConfig );

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const firestore = firebase.firestore();

export {firebase, provider, auth, firestore};