import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDrNcRqHc6o9M41ffUhu7ODOqHl8_MHEyE",
  authDomain: "restaurentonline-a738d.firebaseapp.com",
  databaseURL: "https://restaurentonline-a738d.firebaseio.com",
  projectId: "restaurentonline-a738d",
  storageBucket: "restaurentonline-a738d.appspot.com",
  messagingSenderId: "843710583197",
  appId: "1:843710583197:web:0a3fb14a2ef3595eaddf74",
  measurementId: "G-S6Z06ZLEDH"
};

  const fire = firebase.initializeApp(config);
  export default fire;