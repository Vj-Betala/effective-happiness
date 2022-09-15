// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';

import { FirebaseError, FirebaseOptions, getApp, initializeApp } from "@firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp, Timestamp, collection, query , where, getDocs} from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const config : FirebaseOptions = {
    apiKey: "AIzaSyAwJ85hOkxQvSAF-_d641ywMniQgcDOlTc",
    authDomain: "blog-react-61fc3.firebaseapp.com",
    projectId: "blog-react-61fc3",
    storageBucket: "blog-react-61fc3.appspot.com",
    messagingSenderId: "270028881551",
    appId: "1:270028881551:web:005e923cfad02e172dbafa"
  };

function createFirebaseApp (config : FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(config);
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const serverTimeStamp = serverTimestamp();

export const fromMillis = Timestamp.fromMillis;



//   if(!firebase.apps.length){
//     firebase.initializeApp(firebaseConfig);
//   }

//   export const auth = firebase.auth();
//   export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

//   export const firestore = firebase.firestore();
//   export const storage = firebase.storage();
//   export const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp;

//   export const fromMillis = firebase.firestore.Timestamp.fromMillis;

  export async function getUserWithUserName(username : string) {
    const usersRef = query(collection(firestore, 'users'), where("username", "==", username))
    const userDoc = (await getDocs(usersRef)).docs[0];
    return userDoc;
  }

export function postToJSON(doc) {
  const data = doc.data();

  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt : data.updatedAt.toMillis(),
  };
}