import "./HomePage.css";
import React from "react";
import { Link } from "react-router-dom";
import RecipeRecommendation from "./RecipeRecommendation.js";
import Button from "../../components/Buttons/Button.js";
import { Tooltip } from "@mui/material";

function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user ? user.name : null;

  return (
    <div className="HomePage">
      <div className="NewRecipe">
        {username ? (
          <Link to="/CreateRecipe">
            <Button
              className="CreateRecipeBtn"
              variant="filled"
              color="greenspring"
            >
              Create New Recipe
            </Button>
          </Link>
        ) : (
          <Tooltip title="Login to create your own recipes" leaveDelay={500}>
            <button className="CreateRecipeBtn" disabled>
              Create New Recipe
            </button>
          </Tooltip>
        )}
      </div>
      <RecipeRecommendation />
    </div>
  );
}

export default HomePage;
