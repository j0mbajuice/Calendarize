import app from "firebase/app";

const firebase = require("firebase");

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

    console.log("Constructor for FB");
    console.log(firebase.app().name);

    this.auth = app.auth();
    this.database = app.database();
    this.firestore = app.firestore();
  }

  static test() {
    console.log("Successful Connection");
  }

  // *** Auth API ***

  static createUser(email, password) {
    firebase.initializeApp(config);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log(error);
      });
  }

  static signIn(email, password) {
    firebase.initializeApp(config);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log(error);
      });
  }

}

export default Firebase;
