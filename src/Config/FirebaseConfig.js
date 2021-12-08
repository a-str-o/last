import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/functions';




// Dev environment
// var firebaseConfig = {
//   apiKey: "AIzaSyAhPY4nR5tDanQbIHmP3MLrgNHDka2shns",
//   authDomain: "agenz-dev.firebaseapp.com",
//   projectId: "agenz-dev",
//   storageBucket: "agenz-dev.appspot.com",
//   messagingSenderId: "459123777464",
//   appId: "1:459123777464:web:98b6ad0c1d53adaac3f94d"
// };


// Prod environment

var firebaseConfig = {
    apiKey: "AIzaSyDKUGHP_aDi--W8prH3CtQIOc2cjkh3FRc",
    authDomain: "agenz-website-prod.firebaseapp.com",
    projectId: "agenz-website-prod",
    storageBucket: "agenz-website-prod.appspot.com",
    messagingSenderId: "1032404158043",
    appId: "1:1032404158043:web:c5a936822f9d32837b217e",
};


//Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.storage();
firebase.functions();
export default firebase;