import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCMutGccDcElqjRChHTIHm53JAUFzNnGho",
  authDomain: "clothing-fc9fc.firebaseapp.com",
  databaseURL: "https://clothing-fc9fc.firebaseio.com",
  projectId: "clothing-fc9fc",
  storageBucket: "clothing-fc9fc.appspot.com",
  messagingSenderId: "67053309832",
  appId: "1:67053309832:web:b3162c84f47478ef7d743d",
  measurementId: "G-HRMSGHVBXE",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // if ther user is null (doesn't exist)

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    // create the data
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); // triggers the Google pop-up whenever someone uses the Google auth provider for authentication/sign in
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
