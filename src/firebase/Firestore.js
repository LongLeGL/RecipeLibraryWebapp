import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";
import getRandomInt from "../lib/getRandomInt";

class Firestore {
  constructor(app) {
    this.db = getFirestore(app);
  }

  // Authentication, user base
  async addUser(fname, lname, email) {
    try {
      const docRef = await addDoc(collection(this.db, "users"), {
        fname: fname,
        lname: lname,
        email: email,
      });
      console.log("User added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding user: ", e);
    }
  }

  getUserByEmail(email) {
    const usersRef = collection(this.db, "users");
    const q = query(usersRef, where("email", "==", email), limit(1));
    // Execute query
    return new Promise((resolve, reject) => {
      getDocs(q).then((querySnapshot) => {
        if (querySnapshot.docs.length == 0) {
          console.error("No user found with email:", email);
          reject(null);
        }

        querySnapshot.forEach((doc) => {
          resolve(doc.data());
        });
      });
    });
  }

  // Recipe
  postRecipe(recipeObj) {
    return new Promise(async (resolve, reject) => {
      addDoc(collection(this.db, "recipes"), recipeObj)
        .then((docRef) => {
          console.log("Recipe successfully uploaded with ID: ", docRef.id);
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  getRecommendedRecipe() {
    const recipesRef = collection(this.db, "recipes");
    const goodRecipesQuery = query(recipesRef, where("score", ">=", 4.0));
    return new Promise((resolve, reject) => {
      getDocs(goodRecipesQuery).then((goodRecsSnapshot) => {
        if (goodRecsSnapshot.empty) {
          reject("Snapshot emtpy - No good recipes found");
        }

        let recommendIdx = getRandomInt(0, goodRecsSnapshot.docs.length - 1);
        let iterator = 0;
        goodRecsSnapshot.forEach((recipe) => {
          if (iterator === recommendIdx) {
            resolve({ ...recipe.data(), ...{ id: recipe.id } });
          }
          iterator += 1;
        });
      });
    });
  }
}
export default Firestore;
