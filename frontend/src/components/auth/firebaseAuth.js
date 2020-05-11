import firebase from "firebase";
import { BASE_API_URL } from "../../utils";
import axios from "axios";

// Appetite Eatery's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDHdVAV83wDQynksrn8kN_KahxjVQBPlrI",
  authDomain: "appetite-eatery.firebaseapp.com",
  databaseURL: "https://appetite-eatery.firebaseio.com",
  projectId: "appetite-eatery",
  storageBucket: "appetite-eatery.appspot.com",
  messagingSenderId: "751114214654",
  appId: "1:751114214654:web:5fac4728c393600945d9af",
  measurementId: "G-PQSPFZV3G7",
};

//initialize firebase
export const firebaseAuth = firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export const createMongoDbAccount = async (user, accountType) => {
  let res = await axios.post(`${BASE_API_URL}/user/${accountType}`, user);
  return res;
};

export const signInWithGoogle = () =>
  auth.signInWithPopup(provider).then(async (userCredential) => {});

export default firebaseAuth;
