import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyCFWdOUwBgVqsYX3MY46DMJs48XqQm8QXk",
  authDomain: "ppass-8618e.firebaseapp.com",
  databaseURL: "https://ppass-8618e.firebaseio.com",
  projectId: "ppass-8618e",
  storageBucket: "ppass-8618e.appspot.com",
  messagingSenderId: "447894832271",
  appId: "1:447894832271:web:20e22f6b89eec520495cfa",
  measurementId: "G-3D6FWBJJGL"
};

  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;