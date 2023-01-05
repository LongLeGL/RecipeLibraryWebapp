import React, { useState } from 'react';
import './SearchSortBar.css';
import { Link } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { getRecipe } from "../firebase/database"
import { useNavigate } from 'react-router-dom';

function SearhSortBar({outputSetter}) {
    const navigate = useNavigate()
    const [key, setKey] = useState("");
    const [sort, setSort] = useState("");
    const [recipeTags, setRecipeTags] = useState([]);
    const [errMsg, seterrMsg] = useState("");

    
    let sortBy;
    if(sort === "time"){
        sortBy = 1;
    } else {
        sortBy = 0;
    }
    const recipeName = async (key, recipeTags, sortBy) => {
        const result = await getRecipe(key, recipeTags, sortBy)  
        return result;
    }
    const Tags = ['BreakFast', 'MainMeal', 'LightMeal', 'Desert', 'CleanEating', 'HealthyFood', 'Vegan', 'JunkFood', 'Snack']
    
    function handleSearchSubmit(e){
        //query results based on keywords, sort option, tags, save all into gotResults variable
        e.preventDefault();
        seterrMsg('');
        if(!key) seterrMsg("Recipe Name or Ingredients Required!")
        else if(!sort) seterrMsg("Please choose Order option!")
        else{
            recipeName(key, recipeTags, sortBy).then(result => {
                console.log(result);
                outputSetter(result);
                navigate("/ResultPage"); 
            })
        }
    }
    
    return ( 
        <div className ="SearchSortBar">
            <form action="" id="search-box">
                <input type="text" id ="search-text" placeholder="Search..." onChange={(e) => setKey(e.target.value)}/>
{/* Submit search requirements */}
                {/* <Link to='/ResultPage'> */}
                    <button id="search-btn" onClick={handleSearchSubmit}>Search</button>
                {/* </Link> */}
            </form>

            <div id="Order">
                <label id="lbl">Order by: </label>
                <input type="radio" id="time" name="sort" value= "time" onChange={(e) => setSort(e.target.value)}/> Time 
                <input type="radio" id="rating" name="sort" value= "rating" onChange={(e) => setSort(e.target.value)} /> Rating
            </div>
            <div id="SearchTag">
                <label id="lbl">Tags: </label>
                <Autocomplete
                    multiple
                    id="search-tags-filled"
                    options={Tags.map((option) => option)}
                    // defaultValue={[Tags[0]]}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    onChange={(event, value) => setRecipeTags(value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            // variant="filled"
                            label=""
                            placeholder="Add tags..."
                        />
                    )}
                    
                    sx={{ 
                        width: '35vw' ,
                    }}
                    size="small"
                />
             
            </div>
            <div className={!errMsg ? 'SearchErrMsg.hidden' : 'SearchErrMsg'}>{errMsg}</div>
        </div>
    );
}

export default SearhSortBar;