import React, { useRef, useState } from "react";
import "./CreateRecipe.css";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Button from ".././../components/Buttons/Button";
import CustomRTE from "../../components/Inputs/CustomRTE";
import { MdOutlineAddBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { predefTags } from "../../firebase/predefinedTags";
import { uploadRecipe } from "../../firebase/firebase";

function CreateRecipe() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user){
    window.location.href = "/RecipeLibraryWebapp";
  }

  const [valueName, setValueName] = useState("");
  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState();
  const [instrucion, setInstrucion] = useState();
  const fileInputRef = useRef();
  const [base64, setBase64] = useState(null);

  function handleImgUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64(reader.result);
      // console.log("Encode result:", reader.result)
    };

    if (file) {
      reader.readAsDataURL(file); // Converts the image to base64
      e.target.files = null;
    }
  }

  async function submitFunction() {
    if (!valueName || !ingredients || !instrucion) {
      alert("Please fill in all information!");
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result);
      };

      let newRecipeObj = {
        name: valueName,
        author: {
          id: user.auth.uid,
          name: user.name,
        },
        createdTime: Date.now(),
        tags: tags,
        ingredients: ingredients,
        instructions: instrucion,
        ratings: [],
        score: 0,
        image: base64,
      };
      console.log("Submmited recipe", newRecipeObj);
      uploadRecipe(newRecipeObj)
        .then(() => {
          alert("Recipe successfully uploaded!");
          navigate("/");
          setValueName("");
          setIngredients("");
          setInstrucion("");
          setTags([]);
        })
        .catch((e) => {
          alert("Recipe upload failed with error", e.message);
        });
    }
  }

  return (
    <div className="CreateRecipe">
      <h1 id="CreateRecipe_title">Create Your Recipe</h1>
      <div className="main-bodypart">
        <TextField
          onChange={(e) => {
            setValueName(e.target.value);
          }}
          id="CreateRecipe_nameInput"
          placeholder="Recipe name"
          variant="filled"
          fullWidth
          sx={{
            input: { textAlign: "center", fontSize: "1.5rem", fontWeight: 600 },
          }}
        />

        <Autocomplete
          sx={{
            maxHeight: 110,
            overflowY: "auto",
            overflowX: "hidden",
            maxWidth: "100%",
            paddingTop: "10px",
          }}
          multiple
          options={predefTags.map((option) => option)}
          // defaultValue={[Tags[0]]}
          freeSolo
          onChange={(event, value) => setTags(value)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                key={index}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              placeholder="Search and select tags"
              variant="standard"
            />
          )}
        />

        <p className="InputLabel">Ingredients</p>
        <CustomRTE
          value={ingredients}
          onChange={(e) => {
            setIngredients(e.target.value);
          }}
        />

        <p className="InputLabel">Instructions</p>
        <CustomRTE
          value={instrucion}
          onChange={(e) => {
            setInstrucion(e.target.value);
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="black"
            leftIcon={<MdOutlineAddBox size={22} />}
            style={{ color: "grey", borderColor: "grey" }}
          >
            <label htmlFor="CreateRecipeFileUpload">
              {base64 ? "Change image" : "Add an image"}
            </label>
          </Button>
          <input
            accept="image/*"
            id="CreateRecipeFileUpload"
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              // console.log("Received images:", e.target.files);
              handleImgUpload(e);
            }}
          />

          <div id="CreateRecipe_actionBtns">
            <Button
              onClick={() => navigate("/")}
              variant="outlined"
              color="greenspring"
            >
              Cancel
            </Button>
            <Button
              onClick={submitFunction}
              variant="filled"
              color="greenspring"
            >
              Upload
            </Button>
          </div>
        </div>

        {base64 && (
          <div>
            <p className="InputLabel">Image preview</p>
            <div
              id="CR_ImagePlaceHolder"
              style={{ backgroundImage: `url(${base64})` }}
            >
              <div
                id="CR_ImageRemoveOverlay"
                onClick={() => {
                  setBase64("");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // Clear the file input
                  }
                }}
              >
                Click to remove image
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateRecipe;
