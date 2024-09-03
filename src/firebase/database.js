import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";

const { Index } = require("flexsearch");

const firebaseConfig = {
  apiKey: "AIzaSyCgIEnJIc_YsQlTLhzX-KIA3oZbtyGM1hg",
  authDomain: "doancnpm-5b8c5.firebaseapp.com",
  projectId: "doancnpm-5b8c5",
  storageBucket: "doancnpm-5b8c5.appspot.com",
  messagingSenderId: "631793659831",
  appId: "1:631793659831:web:7d287d4aa96807699ec232",
  measurementId: "G-BP4KXSB71G",
};


//////////////////////      get a single recipe ( use when clickin one)  |   return a recipe as js object
export async function getRecipeByName(recipeName, username) {
  // const recipeSnap = await getDocs(recipeCol)
  // let recipeExist = false;
  // let retRec = {}
  // if (!recipeSnap.empty) {
  //   recipeSnap.forEach(recipe => {
  //     if (recipe.data().name === recipeName && recipe.data().username === username) {
  //       retRec = recipe.data()
  //     }
  //   })
  // }
  // return retRec
}



/////////////////////       search recipe     |     return an object array contains recipes as js object matched the tags
export async function getRecipe(recipeName = "", recipeTags, sortBy = 1) {
  // let Order = sortBy ? "createdTime" : "rating";
  // const searchOrder = query(recipeCol, orderBy(Order, "desc"));
  // const recipeSnap = await getDocs(searchOrder);
  // let searchRes = [];

  // // Get recipe with tags
  // if (!recipeSnap.empty && recipeTags.length > 0) {
  //   recipeSnap.forEach((recipe) => {
  //     for (const i of recipeTags) {
  //       if (recipe.data().tags.includes(i)) {
  //         if (i == recipeTags[recipeTags.length - 1]) {
  //           searchRes.push(recipe.data());
  //         }
  //       } else {
  //         break;
  //       }
  //     }
  //   });
  // } else {
  //   recipeSnap.forEach((recipe) => {
  //     searchRes.push(recipe.data());
  //   });
  //   console.log(searchRes);
  // }

  // // Get the recipes that match the string input
  // if (recipeName != "") {
  //   //console.log("recipe search key: ",recipeName)
  //   var searchIndex = new Index({
  //     charset: "latin:extra",
  //     preset: "match",
  //     tokenize: "reverse",
  //     cache: false,
  //   });
  //   let autoInc = 0;
  //   for (const i of searchRes) {
  //     let recipeInfo = i.name;
  //     recipeInfo += i.ingredients;
  //     //console.log(recipeInfo)
  //     searchIndex.add(autoInc, recipeInfo);
  //     autoInc += 1;
  //   }
  //   let matchedRecipe = searchIndex.search(recipeName);
  //   //console.log("Recipe index here: ", matchedRecipe)
  //   // searchIndex.search return the index in searchRes that contains the input string
  //   // get recipes by index later
  //   let searchResIdx = 0;
  //   let returnRecipes = [];
  //   for (const i of searchRes) {
  //     if (matchedRecipe.includes(searchResIdx)) {
  //       returnRecipes.push(i);
  //     }
  //     searchResIdx += 1;
  //   }
  //   searchRes = returnRecipes;
  // }
  // console.log(searchRes);
  // return searchRes;
}

/////////////////////       update recipe rating
export async function rateRecipe(username, recipeName, rate) {
  // const getAuthorRecipe = query(recipeCol, where("username", "==", username));
  // const sameAuthor = await getDocs(getAuthorRecipe);
  // sameAuthor.forEach(async (recipe) => {
  //   if (recipe.data().name == recipeName) {
  //     //console.log("Recipe id to update is: ",recipe.id)

  //     let newRating =
  //       (recipe.data().rating * recipe.data().ratingCount + rate) /
  //       (recipe.data().ratingCount + 1);
  //     let userRated = username + " " + rate;
  //     let newRatedUser = recipe.data().ratedUser;
  //     newRatedUser.push(userRated);
  //     // console.log("new rating: ",newRating)
  //     // console.log("new rating count: ",recipe.data().ratingCount+1)

  //     const recipeRef = doc(db, "recipes", recipe.id);
  //     await updateDoc(recipeRef, {
  //       rating: newRating,
  //       ratingCount: recipe.data().ratingCount + 1,
  //       ratedUser: newRatedUser,
  //     });
  //   }
  // });
}

////////////////////        download recipe

export async function saveRecipe(recipe) {
  // let recName = recipe.name + " by " + recipe.username + ".pdf";
  // const { jsPDF } = require("jspdf");
  // const doc = new jsPDF({
  //   orientation: "p",
  //   lineHeight: 1.7,
  // });
  // doc.setFont("Times");
  // let [x, y] = [10, 10];

  // doc.setFontSize(16).setFont(undefined, "bold");
  // doc.text(`${recipe.name}`, x, y);
  // y += 7;
  // doc.setFontSize(12).setFont(undefined, "normal");
  // doc.text("By ", x, y);
  // x += 7;
  // doc.text(`${recipe.username}`, x, y);
  // x -= 7;
  // y += 10;
  // doc.setFont(undefined, "bold");
  // doc.text("Ingredients: ", x, y);
  // y += 7;
  // doc.setFontSize(10).setFont(undefined, "normal");
  // doc.text(`${recipe.ingredients}`, x, y);
  // y += `${recipe.ingredients}`.split(/\r\n|\r|\n/).length * 7;
  // doc.setFontSize(12).setFont(undefined, "bold");
  // doc.text("Steps: ", x, y);
  // doc.setFontSize(10).setFont(undefined, "normal");
  // y += 10;
  // var splitstep = doc.splitTextToSize(`${recipe.steps}`, 180);
  // doc.text(splitstep, x, y);
  // doc.save(recName);
}
