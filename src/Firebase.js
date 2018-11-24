import firebase from "firebase";

const config = {
    apiKey: "AIzaSyBKcXkhjGi9ELvlfD_tI6SEeP6f3Iv79eg",
    authDomain: "calendarize-cmpe172.firebaseapp.com",
    databaseURL: "https://calendarize-cmpe172.firebaseio.com",
    projectId: "calendarize-cmpe172",
    storageBucket: "calendarize-cmpe172.appspot.com",
    messagingSenderId: "307918608770"
  };

class Firebase {
  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth();
    this.database = firebase.database();
    this.firestore = firebase.firestore();
  }

  // *** Auth API ***

  createUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  passwordReset = email => this.auth.sendPasswordResetEmail(email);

  passwordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;
