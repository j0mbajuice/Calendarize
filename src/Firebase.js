import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBKcXkhjGi9ELvlfD_tI6SEeP6f3Iv79eg",
    authDomain: "calendarize-cmpe172.firebaseapp.com",
    databaseURL: "https://calendarize-cmpe172.firebaseio.com",
    projectId: "calendarize-cmpe172",
    storageBucket: "calendarize-cmpe172.appspot.com",
    messagingSenderId: "307918608770"
  };

firebase.initializeApp(config);

export default firebase;

export const Database = firebase.database();
export const Auth = firebase.auth();
export const Storage = firebase.storage();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const Messaging = firebase.messaging();
