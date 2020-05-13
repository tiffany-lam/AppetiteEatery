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
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATANASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
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
