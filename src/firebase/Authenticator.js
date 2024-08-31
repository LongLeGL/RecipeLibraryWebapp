import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

class Authenticator {
  constructor(app) {
    this.auth = getAuth(app);
  }

  register(email, password) {
    // console.log(`Registering: ${email} - ${password}`)
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          // Signed up successfully
          const user = userCredential.user;
          console.log("Firebase auth returned user:", user);
          resolve(user);
        })
        .catch((error) => {
          console.error(`Registration err: ${error.code}: ${error.message}`);
          reject(error);
        });
    });
  }

  authenticate(email, password) {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          // Signed in successfully
          const user = userCredential.user;
          resolve(user);
        })
        .catch((error) => {
          console.error(`Authentication err: ${error.code}: ${error.message}`);
          reject(error);
        });
    });
  }
}

export default Authenticator;
