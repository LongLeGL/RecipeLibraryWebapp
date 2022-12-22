import React from 'react';
import './SearchSortBar.css';
import { Link } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

function SearhSortBar({outputSetter}) {
    const Tags = ['Tatsy', 'Chicken', 'Pizza', 'Noodle', 'CleanEating', 'HealthyFood', 'JustEatRealFood', 'VeganFood', 'HealthyFoodRecipes', 'HealthyFoodLover', 'Popcorn']
    function handleSearchSubmit(){
        //query results based on keywords, sort option, tags, save all into gotResults variable
        var gotResults = [];
        outputSetter(gotResults);
    }


    return ( 
        <div className ="SearchSortBar">
            <form action="" id="search-box">
                <input type="text" id ="search-text" placeholder="Search..."/>
{/* Submit search requirements */}
                <Link to='/ResultPage'>
                    <button id="search-btn" onClick={handleSearchSubmit}>Search</button>
                </Link>
            </form>

            <div id="Order">
                <label id="lbl">Order by:    </label>
                <input type="radio" id="time" name="sort"/> Time <input type="radio" id="rating" name="sort" /> Rating
            </div>
            <div id="SearchTag">
                <label id="lbl">Tags: </label>
                <Autocomplete
                    multiple
                    id="search-tags-filled"
                    options={Tags.map((option) => option)}
                    defaultValue={[Tags[0]]}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
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
        </div>
    );
}

export default SearhSortBar;