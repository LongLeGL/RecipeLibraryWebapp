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
import { orderBy } from "lodash";

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

  searchRecipes(name, tags, order) {
    console.log(
      `Querying firebase for: ${name} - ${
        tags.length>0 ? tags.join(",") : "no tags"
      } - ${order}`
    );
    const recipesRef = collection(this.db, "recipes");
    let queryParams = [recipesRef, orderBy(order || "createdTime", "desc")];
    // if (tags.length > 0)
    //   queryParams.push(where("tags", "array-contains", tags[0]));
    const q = query(...queryParams);

    return new Promise((resolve, reject) => {
      getDocs(q).then((querySnapshot) => {
        if (querySnapshot.docs.length == 0) {
          console.log(`No recipes found from firestore`);
          resolve([]);
        }

        let returnedRecipes = [];
        // Perform text search on the frontend (not supported by firestore)
        querySnapshot.forEach((doc) => {
          let docData = doc.data();
          if (
            docData.name.includes(name) ||
            docData.ingredients.includes(name)
          ) {
            returnedRecipes.push({ ...docData, ...{ id: doc.id } });
          }
        });

        // Perform more tags filtering as firestore does not support it
        let filteredRecipes = []
        if (tags.length > 0){
          filteredRecipes = returnedRecipes.filter((recipe) => {
            if (tags.every((tag) => recipe.tags.includes(tag))) return true;
          });
        }
        else filteredRecipes = returnedRecipes;
        console.log("Firestore filtered recipes:", filteredRecipes);
        resolve(filteredRecipes);
      });
    });
  }
}
export default Firestore;
