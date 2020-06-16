import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDmmgZKxKzWrhBnFwj5S5lms6pLDsvtCiQ",
  authDomain: "ppass-b3b38.firebaseapp.com",
  databaseURL: "https://ppass-b3b38.firebaseio.com",
  projectId: "ppass-b3b38",
  storageBucket: "ppass-b3b38.appspot.com",
  messagingSenderId: "183672479547",
  appId: "1:183672479547:web:d8960763a66ad4f700a11e",
  measurementId: "G-7X2FBY4SMF"
};

  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;