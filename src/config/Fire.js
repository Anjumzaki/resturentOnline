import firebase from 'firebase';


const firebaseConfig = {
  // apiKey: "AIzaSyCFWdOUwBgVqsYX3MY46DMJs48XqQm8QXk",
  // authDomain: "ppass-8618e.firebaseapp.com",
  // databaseURL: "https://ppass-8618e.firebaseio.com",
  // projectId: "ppass-8618e",
  // storageBucket: "ppass-8618e.appspot.com",
  // messagingSenderId: "447894832271",
  // appId: "1:447894832271:web:20e22f6b89eec520495cfa",
  // measurementId: "G-3D6FWBJJGL"
  apiKey: "AIzaSyDrNcRqHc6o9M41ffUhu7ODOqHl8_MHEyE",
  authDomain: "restaurentonline-a738d.firebaseapp.com",
  databaseURL: "https://restaurentonline-a738d.firebaseio.com",
  projectId: "restaurentonline-a738d",
  storageBucket: "restaurentonline-a738d.appspot.com",
  messagingSenderId: "843710583197",
  appId: "1:843710583197:web:0a3fb14a2ef3595eaddf74",
  measurementId: "G-S6Z06ZLEDH"
};

  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;