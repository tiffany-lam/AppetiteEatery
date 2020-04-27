import firebase from 'firebase'
  // Appetite Eatery's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDHdVAV83wDQynksrn8kN_KahxjVQBPlrI",
    authDomain: "appetite-eatery.firebaseapp.com",
    databaseURL: "https://appetite-eatery.firebaseio.com",
    projectId: "appetite-eatery",
    storageBucket: "appetite-eatery.appspot.com",
    messagingSenderId: "751114214654",
    appId: "1:751114214654:web:5fac4728c393600945d9af",
    measurementId: "G-PQSPFZV3G7"
  };
  const firebaseAuth = firebase.initializeApp(firebaseConfig);
  const provider = new firebase.auth.GoogleAuthProvider();
  export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  };
  export default firebaseAuth; 