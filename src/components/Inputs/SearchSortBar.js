import React, { useState } from "react";
import "./SearchSortBar.css";

import { CiSearch } from "react-icons/ci";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import {predefTags} from "../../firebase/predefinedTags";
import { searchRecipes } from "../../firebase/firebase";

function SearchSortBar({ setRecipes, kw, tags, order }) {
  const navigate = useNavigate();
  const [key, setKey] = useState(kw);
  const [recipeTags, setRecipeTags] = useState(tags);
  const [sort, setSort] = useState(order);
  const [errMsg, seterrMsg] = useState("");

  function handleSearchSubmit(e) {
    //query results based on keywords, sort option, tags, save all into gotResults variable
    e.preventDefault();
    seterrMsg("");
    if (!sort) seterrMsg("Please choose Order option!");
    else {
			// window.location.href = `/RecipeLibraryWebapp#/search?q=${key}&tags=${recipeTags}&o=${sort}`;
      navigate(
        `/search?q=${key}&tags=${recipeTags}&o=${sort}`
      );
      navigate(0);
			// navigate(
			// 	`/RecipeLibraryWebapp/search?q=${key}&tags=${recipeTags}&o=${sort}`
			// );
    }
  }

  return (
    <div className="SearchSortBar">
      <div id="resPageSearchBox">
        <CiSearch className="searchIcon" size={20} onClick={handleSearchSubmit} />{" "}
        <input
          type="text"
          id="searchBox_resultsPage"
          placeholder="Search by name or ingredient"
          value={key}
          onChange={(e) => {
            setKey(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchSubmit(e);
            }
          }}
					style={{display:"relative"}}
        />
      </div>

      <div id="SSbarOrder">
        <label id="lbl">Order by: </label>
        <input
          type="radio"
          id="time"
          name="sort"
          value="createdTime"
          onChange={(e) => setSort(e.target.value)}
					checked={sort === "createdTime"}
        />{" "}
        Time
        <input
          type="radio"
          id="rating"
          name="sort"
          value="score"
          onChange={(e) => setSort(e.target.value)}
					checked={sort === "score"}
        />{" "}
        Rating
      </div>

      <div id="SearchTag">
        <Autocomplete
          sx={{
            maxHeight: 110,
            overflowY: "auto",
            overflowX: "hidden",
						width: "100%",
            maxWidth: "100%",
          }}
          multiple
          options={predefTags.map((option) => option)}
          defaultValue={tags}
          freeSolo
          onChange={(event, value) => setRecipeTags(value)}
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
      </div>
      <div className={!errMsg ? "SearchErrMsg.hidden" : "SearchErrMsg"}>
        {errMsg}
      </div>
    </div>
  );
}

export default SearchSortBar;
