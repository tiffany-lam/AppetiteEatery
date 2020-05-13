/*
  Contributor: Tiffany Lam 
  Course: CECS 470

  Description: Initialize the firebase configurating and creates functions to use later in our register and login pages. 
  Also create the auth for the firebase auth user. I also create the signInWithGoogle function to be used with google sign in/register in those pages. 

*/
import firebase from "firebase";
import { BASE_API_URL } from "../../utils";
import axios from "axios";

// Appetite Eatery's Firebase configuration
//firebase allows public key, security is set through security rules
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
console.log(firebaseConfig.apiKey);
const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export const createMongoDbAccount = async (user, accountType) => {
  let res = await axios.post(`${BASE_API_URL}/user/${accountType}`, user);
  return res;
};

export const signInWithGoogle = () =>
  auth.signInWithPopup(provider).then(async (userCredential) => {});

export default firebaseAuth;
