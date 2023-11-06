import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'

import './SearchBar.css';

function SearchBar({outputSetter}) {
    const navigate = useNavigate()
    const [key, setKey] = useState("");

    
    function handleSearchSubmit(e){
        //query results based on keywords, sort option, tags, save all into gotResults variable
        e.preventDefault();
        if(!key) console.log("Recipe Name or Ingredients Required!")
        else{
            // recipeName(key, recipeTags, sortBy).then(result => {     recipeNmae is query function
            //     console.log(result);
            //     outputSetter(result);
                navigate("/ResultPage"); 
            // })
        }
    }
    
    return ( 
        <div className ="SearchBar">
            <form action="" id="search-box">
                <input type="text" id ="search-text" placeholder="Search..." onChange={(e) => setKey(e.target.value)}/>
                <button id="search-btn" onClick={handleSearchSubmit}><FontAwesomeIcon icon={faSearch} /></button>
            </form>
        </div>
    );
}

export default SearchBar;