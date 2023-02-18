// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  addDoc,
  onSnapshot
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7h0qXV2EORh7d_EAgfpDCPFcXaajjy_A",
  authDomain: "figma-shop.firebaseapp.com",
  projectId: "figma-shop",
  storageBucket: "figma-shop.appspot.com",
  messagingSenderId: "50964194230",
  appId: "1:50964194230:web:ff9a19c77123ae1e101717",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const fetchProducts = async () => {
  try {
    const products = await getDocs(collection(db, 'products'))
    const thisArray = products.docs.map(item => item.data())
    return thisArray
  } catch (error) {
    throw new Error(error.code);
  }
};
