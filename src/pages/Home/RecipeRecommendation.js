import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import convertDateTime from "../../lib/convertDateTime";
import { getRecipeRecommendation } from "../../firebase/firebase";

function RecipeRecommendation() {
  const [recommdedRecipeState, setrecommdedRecipeState] = useState();

  useEffect(() => {
    getRecipeRecommendation()
      .then((recipe) => {
        console.log("Got recommendation:", recipe);
        setrecommdedRecipeState(recipe);
      })
      .catch((e) => {
        console.error("Err getting recommendation:", e);
      });
  }, []);

  return (
    <Link
      to={`ViewRecipe/${recommdedRecipeState?.id}`}
      style={{
        width: "fit-content",
        height: "fit-content",
        margin: "0 auto",
      }}
    >
      <div className="RecipeOfTheDay" style={{backgroundImage: `url(${recommdedRecipeState?.image})`}}>
        <div id="RecipeOfTheDay-header">Featured Recipe</div>
        <div id="RecipeOfTheDay-panel">
          <div id="rodPanelTitle">
            <h2>
              {recommdedRecipeState ? recommdedRecipeState?.name : "Loading..."}
            </h2>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}
            >
              (<span>{recommdedRecipeState?.score.toFixed(1)}</span>
              <ReactStars
                count={1}
                size={16}
                color="#ffd700"
                className="ResultRateStars"
              />
              )
            </div>
          </div>
          <p>By {recommdedRecipeState?.author.name}</p>
          <span className="CreatedTimeDisplay">
            {convertDateTime(recommdedRecipeState?.createdTime)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default RecipeRecommendation;
