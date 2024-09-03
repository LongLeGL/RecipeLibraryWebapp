import React, { useRef } from "react";
import "./ViewRecipe.css";
import Stack from "@mui/material/Stack";
import Button from "../../components/Buttons/Button";
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipe } from "../../firebase/firebase";
import convertDateTime from "../../lib/convertDateTime";
import { submitRecipeRating } from "../../firebase/firebase";
import { FaFileDownload } from "react-icons/fa";
import parse from "html-react-parser";
import jsPDF from "jspdf";

function ViewRecipe() {
  const { recipeId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [rate, setRate] = useState();
  const [userRated, setUserRated] = useState(false);
  const [recipe, setRecipe] = useState();
  const pdfRef = useRef();

  useEffect(() => {
    fetchRecipe(recipeId)
      .then((recipeOBJ) => {
        console.log("Fetched recipe:", recipeOBJ);
        setRecipe(recipeOBJ);

        // Check if current usr has rated the recipe or not
        if (recipeOBJ.ratings.some((usrRate) => usrRate.id === user.auth.uid)) {
          setUserRated(true);
          console.log("User has already rated recipe");
        }
      })
      .catch((e) => {
        console.error("Error fetching recipe:", e);
      });
  }, []);

  const handleSubmit = () => {
    if (!rate) {
      alert("Please pick a rating before submitting!");
    } else {
      // Call firestore rating function
      submitRecipeRating(user.auth.uid, rate, recipeId)
        .then((newScore) => {
          alert("Successfully submitted rating score: " + rate);
          console.log("New average:", newScore);
          setUserRated(true);
          setRecipe({...recipe, score: newScore});
          // window.location.reload();
        })
        .catch((e) => {
          console.error("Error rating recipe:", e);
          alert("An error has occured, recipe rating failed !");
        });
    }
  };

  function saveRecipe() {
    let recName = recipe.name + " by " + recipe.author.name + ".pdf";
    const doc = new jsPDF({
      orientation: "p",
      lineHeight: 1.7,
    });
    doc.setFont("Times");
    let [x, y] = [10, 10];

    // Write doc line by line
    doc.setFontSize(16).setFont(undefined, "bold");
    doc.text(`${recipe.name}`, x, y);

    y += 7;
    doc.setFontSize(12).setFont(undefined, "normal");
    doc.text("By ", x, y);
    x += 7;
    doc.text(`${recipe.author.name}`, x, y);
    x -= 7;

    y += 11;
    doc.html(pdfRef.current, {
      callback: function (doc) {
        // Save the PDF document
        doc.save(recName);
      },
      x,
      y,
      width: 180,
      windowWidth: 800,
    });
  }

  if (recipe)
    return (
      <div className="ViewRecipe">
        <div id="recipeView_bg">
          <div className="recipeView_infos">
            <h1 id="recipeView_title">{recipe.name}</h1>
            <div id="recipeView_metadata">
              <div>
                <span className="recipeView_label">Author:</span>{" "}
                <span>{recipe.author.name}</span>
              </div>
              <div>
                <span className="recipeView_label">Date:</span>{" "}
                <span>{convertDateTime(recipe.createdTime).slice(0, -3)}</span>
              </div>
            </div>
            <div id="recipeView_tags">
              <span className="recipeView_label">Tags:</span>{" "}
              <span>{recipe.tags.join(", ")}</span>
            </div>
          </div>
          <div ref={pdfRef}>
            <div id="recipeImageIngredients">
              <img src={recipe.image} alt="Recipe's image" />
              <div id="recipeView_ingredients">
                <h2 className="recipeSectionTitle">Ingredients</h2>
                {parse(recipe.ingredients)}
              </div>
            </div>
            <div id="recipeInstructions">
              <h2 className="recipeSectionTitle">Instructions</h2>
              {parse(recipe.instructions)}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "20px",
            }}
          >
            <div id="recipeView_rating">
              <h3 className="recipeView_label">
                {(userRated || !user) ? "Rating:" : "Rate the recipe:"}
              </h3>
              <ReactStars
                count={5}
                onChange={(newVal) => {
                  setRate(newVal);
                }}
                size={35}
                isHalf={true}
                value={userRated || !user ? recipe.score : 0}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                edit={user && !userRated}
              />
              <span className="recipeView_label">
                {userRated || !user ? null : `(Current: ${recipe.score})`}
              </span>
              <Stack spacing={10} direction="row">
                {!userRated && user && (
                  <Button
                    onClick={handleSubmit}
                    variant="outlined"
                    color="greenspring"
                  >
                    Submit rating
                  </Button>
                )}
              </Stack>
            </div>
            <Button
              onClick={saveRecipe}
              variant="outlined"
              color="black"
              style={{ margin: "0.3em" }}
              leftIcon={<FaFileDownload />}
            >
              Save recipe to device
            </Button>
          </div>
        </div>
      </div>
    );
  else return <div id="recipeDataStatus">Fetching data...</div>;
}

export default ViewRecipe;
