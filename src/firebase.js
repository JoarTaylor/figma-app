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
  onSnapshot,
} from "firebase/firestore";

import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth'

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

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const fetchProducts = async () => {
  try {
    const docRef = doc(db, "Shop", "Products");
    const snapshot = await getDoc(docRef);
    const { products } = snapshot.data();
    return products;
  } catch (error) {
    throw new Error(error.code);
  }
};

export const addProductsToFirebase = async (products) => {
  try {
    const docRef = doc(db, "Shop", "Products");
    await setDoc(docRef, { products });
  } catch (error) {
    throw new Error(error.code);
  }
};

export const addUserToFirebase = async (collection, docName, data) => {
    try {
      const docRef = doc(db, collection, docName);
      await setDoc(docRef, data)
    } catch (error) {
      throw new Error(error.code);
    }
}

export const getUserFromFireBase = async (collection, docName) => {
  try {
    const docRef = doc(collection, docName);
    const snapshot = await getDoc(docRef);
    const user = snapshot.data()
    return user
  } catch (error) {
    throw new Error(error.code);
  }
}



 export const signInWithGoogle = async () => {
    let email;
    await signInWithPopup(auth, provider).then((result) => {
      console.log(result.user.email)
       email = result.user.email
    }) 
    return email;
 }

 export const getUserAuthId = async handler => {
  onAuthStateChanged(auth, (user) => {
    handler(user)
  })
 }

 export const signOutFromGoogle = async () => {
  let signedOut = Boolean;
    await signOut(auth).then(() => {
      signedOut = true;
    }).catch((error) => {
      console.log(error)
      signedOut = false;
    })
    return signedOut;
 }