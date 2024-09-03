import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import getRandomInt from "../lib/getRandomInt";

class Firestore {
  constructor(app) {
    this.db = getFirestore(app);
    this.usersRef = collection(this.db, "users");
    this.recipesRef = collection(this.db, "recipes");
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
    const q = query(this.usersRef, where("email", "==", email), limit(1));
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
    const goodRecipesQuery = query(this.recipesRef, where("score", ">=", 4.0));
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

  getRecipeByID(id) {
    const docRef = doc(this.db, "recipes", id);
    return new Promise((resolve, reject) => {
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          resolve({ ...docSnap.data(), id: id });
        } else {
          reject("No recipe found with id: " + id);
        }
      });
    });
  }

  searchRecipes(name, tags, order) {
    console.log(
      `Querying firebase for: ${name} - ${
        tags.length > 0 ? tags.join(",") : "no tags"
      } - ${order}`
    );
    let queryParams = [
      this.recipesRef,
      orderBy(order || "createdTime", "desc"),
      limit(10)
    ];
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
            docData.name.toLowerCase().includes(name.toLowerCase()) ||
            docData.ingredients.includes(name.toLowerCase())
          ) {
            returnedRecipes.push({ ...docData, ...{ id: doc.id } });
          }
        });
        console.log("Before filter:", returnedRecipes);

        // Perform more tags filtering as firestore does not support it
        let filteredRecipes = [];
        if (tags.length > 0) {
          filteredRecipes = returnedRecipes.filter((recipe) => {
            if (tags.every((tag) => recipe.tags.includes(tag))) return true;
          });
        } else filteredRecipes = returnedRecipes;
        console.log("Firestore filtered recipes:", filteredRecipes);
        resolve(filteredRecipes);
      });
    });
  }

  rateRecipe(uid, score, rid) {
    return new Promise((resolve, reject) => {
      this.getRecipeByID(rid).then((recipeOBJ) => {
        // Add new rating, calculate new average
        let newRatings = [...recipeOBJ.ratings, { id: uid, score: score }];
        const newAvg =
          newRatings.reduce((sum, rating) => sum + rating.score, 0) /
          newRatings.length;
        const newScore = Math.round(newAvg * 10) / 10;
        console.log("New avg", newScore);

        // Update new object to firestore

        const ratedRecRef = doc(this.db, "recipes", rid);
        updateDoc(ratedRecRef, {
          ratings: newRatings,
          score: newScore, //rounded to 1 digit
        })
          .then(() => {
            resolve(newScore);
          })
          .catch((e) => {
            reject(e);
          });
      });
    });
  }
}
export default Firestore;
