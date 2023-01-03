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
  updateDoc
} from "firebase/firestore"

const { Index } = require("flexsearch");

const firebaseConfig = {
  apiKey: "AIzaSyCgIEnJIc_YsQlTLhzX-KIA3oZbtyGM1hg",
  authDomain: "doancnpm-5b8c5.firebaseapp.com",
  projectId: "doancnpm-5b8c5",
  storageBucket: "doancnpm-5b8c5.appspot.com",
  messagingSenderId: "631793659831",
  appId: "1:631793659831:web:7d287d4aa96807699ec232",
  measurementId: "G-BP4KXSB71G"
};

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
const userCol = collection(db, "users")
const recipeCol = collection(db, "recipes")

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Get user -  login
/////////////////////       Getusername and password    |   return array contains login status at index 0 and username at index 1 (if created successfully) 
export async function authenticate(username, password) {
  const userSnap = await getDocs(userCol)
  let loginStatus = []
  let verified = false;

  if (!userSnap.empty) {
    userSnap.forEach(user => {
      if (user.data().username === username && user.data().password === password) {
        verified = true;
      }
    })
  }
  loginStatus.push(verified)
  if (verified) {
    loginStatus.push(username)
  }
  return loginStatus
}


//////////////////////       Register      |      return array contains register status at index 0 and username at index 1 (if created successfully)
export async function accountRegister(regusername, regpassword) {
  const userSnap = await getDocs(userCol)
  let registerStatus = []
  let verified = true;

  if (!userSnap.empty) {
    userSnap.forEach(user => {
      if (user.data().username === regusername) {
        verified = false
      }
    })
  }
  registerStatus.push(verified)
  if (verified) {
    addDoc(userCol, { username: regusername, password: regpassword })
    registerStatus.push(regusername)
  }
  return registerStatus
}

//////////////////////      get a single recipe ( use when clickin one)  |   return a recipe as js object
export async function getRecipeByName(recipeName, username) {
  const recipeSnap = await getDocs(recipeCol)
  let recipeExist = false;
  let retRec = {}
  if (!recipeSnap.empty) {
    recipeSnap.forEach(recipe => {
      if (recipe.data().name === recipeName && recipe.data().username === username) {
        retRec = recipe.data()
      }
    })
  }
  return retRec
}


/////////////////////        add recipe    |    return true if cannot add recipe   
export async function userCreateRecipe(recipeObj, username) {
  console.log(JSON.parse(JSON.stringify(recipeObj)))
  const getOwnRecipe = query(recipeCol, where('username', "==", username))
  const ownRecipeSnap = await getDocs(getOwnRecipe)
  // check duplicate recipe by same user
  let created = false
  if (!ownRecipeSnap.empty) {
    ownRecipeSnap.forEach(ownRec => {
      if (ownRec.data().name == recipeObj.name) {
        //console.log("U have already created a recipe with the same name!")   
        //return message here if existed
        created = true

      }
    })
  }
  // if no then add recipe
  if (!created) {
    addDoc(recipeCol, recipeObj)
    //console.log("Recipe successfully added!")     
    //return message here if add successfully                             
  }
  return created
}


/////////////////////        get random recipe    |    return a recipe as js object  
export async function getRandomRecipe() {
  const getGoodRecipe = query(recipeCol, where('rating', ">=", 4.0))
  const recipeSnap = await getDocs(getGoodRecipe)
  //count matched recipe 
  let counter = 0
  if (!recipeSnap.empty) {
    recipeSnap.forEach(() => {
      counter += 1;
    })
  }
  //console.log("recipes matched requirements",counter)

  //random recipe index
  let recommendIdx = getRandomInt(1, counter)
  //console.log("Random recipe id",recommendIdx)

  //get recipe with random index just created
  let iterator = 1
  let returnRecipe = {}
  if (!recipeSnap.empty) {
    recipeSnap.forEach(recipe => {
      if (iterator === recommendIdx) {
        returnRecipe = recipe.data()
      }
      iterator += 1
    })
  }
  // console.log("random recipe here",returnRecipe)
  return returnRecipe
}


/////////////////////       search recipe     |     return an object array contains recipes as js object matched the tags
export async function getRecipe(recipeName = "", recipeTags, sortBy = 1) {
  let Order = sortBy ? 'createdTime' : 'rating'
  const searchOrder = query(recipeCol, orderBy(Order))
  const recipeSnap = await getDocs(searchOrder)
  let searchRes = []

  // Get recipe with tags
  if (!recipeSnap.empty) {
    recipeSnap.forEach(recipe => {
      for (const i of recipeTags) {
        if (recipe.data().tags.includes(i)) {
          if (i === recipeTags[recipeTags.length - 1]) {
            searchRes.push(recipe.data())
          }
        }
        else {
          break
        }
      }
    })
  }

  // Get the recipes that match the string input
  if (recipeName !== "") {
    var searchIndex = new Index({
      charset: "latin:extra",
      preset: 'match',
      tokenize: 'strict',
      cache: false
    })
    let autoInc = 0
    for (const i of searchRes) {
      let recipeInfo = i.name
      recipeInfo += i.ingredients
      console.log(recipeInfo)
      searchIndex.add(autoInc, recipeInfo)
      autoInc += 1;
    }
    let matchedRecipe = searchIndex.search(recipeName)
    console.log("Recipe index here: ", matchedRecipe)
    // searchIndex.search return the index in searchRes that contains the input string
    // get recipes by index later
    let searchResIdx = 0
    let returnRecipes = []
    for (const i of searchRes) {
      if (matchedRecipe.includes(searchResIdx)) {
        returnRecipes.push(i)
      }
      searchResIdx += 1
    }
    console.log(returnRecipes)
    return returnRecipes
  }
  else {
    console.log("Seach result here: ", searchRes)
    return searchRes
  }
}


/////////////////////       update recipe rating     
export async function rateRecipe(username, recipeName, rate) {
  const getAuthorRecipe = query(recipeCol, where("username", "==", username))
  const sameAuthor = await getDocs(getAuthorRecipe)
  sameAuthor.forEach(async (recipe) => {
    if (recipe.data().name == recipeName) {
      //console.log("Recipe id to update is: ",recipe.id)

      let newRating = (recipe.data().rating * recipe.data().ratingCount + rate) / (recipe.data().ratingCount + 1)
      let userRated = username + " " + rate
      let newRatedUser = recipe.data().ratedUser
      newRatedUser.push(userRated)
      // console.log("new rating: ",newRating)
      // console.log("new rating count: ",recipe.data().ratingCount+1)

      const recipeRef = doc(db, "recipes", recipe.id)
      await updateDoc(recipeRef, {
        rating: newRating,
        ratingCount: recipe.data().ratingCount + 1,
        ratedUser: newRatedUser
      })
    }
  })
}



