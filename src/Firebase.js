import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBKcXkhjGi9ELvlfD_tI6SEeP6f3Iv79eg",
  authDomain: "calendarize-cmpe172.firebaseapp.com",
  databaseURL: "https://calendarize-cmpe172.firebaseio.com",
  projectId: "calendarize-cmpe172",
  storageBucket: "calendarize-cmpe172.appspot.com",
  messagingSenderId: "307918608770"
};

class Firebase {
  // TODO: Constructor is not called.
  constructor() {
    console.log("Constructor");
    firebase.initializeApp(config);
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

  static isLoggedIn() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var email = user.email;
        console.log(email);
        // ...
      } else {
        console.log("No User is Logged In");
        // User is signed out.
        // ...
      }
    });
  }
}

export default Firebase;
