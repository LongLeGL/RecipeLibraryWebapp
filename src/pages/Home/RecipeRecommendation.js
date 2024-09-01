import { React, useState } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import convertDateTime from "../../lib/convertDateTime";

function RecipeRecommendation() {
  const [recommdedRecipeState, setrecommdedRecipeState] = useState({
    name: "Fish Casserole",
    rating: 4.5,
    username: "Long Le",
  });

  // const getRecommendation = async () => {
  //   const result = await getRandomRecipe();
  //   return result;
  // };
  // // var recommdedRecipe2;
  // var recommdedRecipe = {};
  // getRecommendation().then((result) => {
  //   if (!recommdedRecipeState.name) {
  //     recommdedRecipe = result;
  //     console.log(recommdedRecipe.name);
  //     setrecommdedRecipeState(recommdedRecipe);
  //   }
  // });

  return (
    <Link
      to={`ViewRecipe/${recommdedRecipeState.name}/${recommdedRecipeState.username}`}
      style={{ width: "fit-content", height: "fit-content", margin: "0 auto" }}
    >
      <div className="RecipeOfTheDay">
        <div id="RecipeOfTheDay-header">Featured Recipe</div>
        <div id="RecipeOfTheDay-panel">
          <div id="rodPanelTitle">
            <h2>{recommdedRecipeState.name}</h2>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}
            >
              (
                <span>{recommdedRecipeState.rating?.toFixed(1)}</span>
                <ReactStars
                  count={1}
                  size={16}
                  color="#ffd700"
                  className="ResultRateStars"
                />
              )
            </div>
          </div>
          <p>By {recommdedRecipeState.username}</p>
          <span className="CreatedTimeDisplay">
            {convertDateTime(recommdedRecipeState.createdTime)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default RecipeRecommendation;
