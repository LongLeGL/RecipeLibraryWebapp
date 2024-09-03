import { initializeApp } from "firebase/app";
import {
  getAuth
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  doc,
  updateDoc
} from "firebase/firestore"
import Authenticator from "./Authenticator";
import Firestore from "./Firestore";

const { Index } = require("flexsearch");

const firebaseConfig = {
  apiKey: "AIzaSyAZ8UTX25MVpHywHvJsXV6-p_VUsHIutbA",
  authDomain: "recipelib-2eac5.firebaseapp.com",
  projectId: "recipelib-2eac5",
  storageBucket: "recipelib-2eac5.appspot.com",
  messagingSenderId: "92617703424",
  appId: "1:92617703424:web:b7e435c7d21140eda958e5",
  measurementId: "G-3NQY29J628"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authenticator = new Authenticator(app);
const firestore = new Firestore(app);

// Authentication
export function registerUser(email, password){
  return authenticator.register(email, password);
}

export function authenticateUser(email, password){
  return authenticator.authenticate(email, password);
}

export function addUserInfo(fname, lname, email){
  firestore.addUser(fname, lname, email);
}

export function getUserInfoByEmail(email){
  return firestore.getUserByEmail(email);
}

export function uploadRecipe(recipe){
  return firestore.postRecipe(recipe);
}

export function getRecipeRecommendation(){
  return firestore.getRecommendedRecipe();
}

export function fetchRecipe(recipeID){
  return firestore.getRecipeByID(recipeID);
}

export function searchRecipes(name, tags, order){
  return firestore.searchRecipes(name, tags, order);
}

export function submitRecipeRating(uid, score, rid){
  return firestore.rateRecipe(uid, score, rid);
}