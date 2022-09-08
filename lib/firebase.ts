import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAwJ85hOkxQvSAF-_d641ywMniQgcDOlTc",
    authDomain: "blog-react-61fc3.firebaseapp.com",
    projectId: "blog-react-61fc3",
    storageBucket: "blog-react-61fc3.appspot.com",
    messagingSenderId: "270028881551",
    appId: "1:270028881551:web:005e923cfad02e172dbafa"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const storage = firebase.storage();