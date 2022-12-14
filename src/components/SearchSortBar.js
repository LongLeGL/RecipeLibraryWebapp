import React from 'react';
import './SearchSortBar.css';
import { Link } from 'react-router-dom';

function SearhSortBar() {
    return ( 
        <div className ="SearchSortBar">
            <form action="" id="search-box">
                <input type="text" id ="search-text" placeholder="Search..."/>
                <Link to="/ResultPage">
                    <button id="search-btn">Search</button>
                </Link>
            </form>

            <div id="Order">
                <label id="lbl">Order by:    </label>
                <input type="radio" id="time" name="sort"/> Time <input type="radio" id="rating" name="sort" /> Rating
            </div>
            <div id="SearchTag">
                <label id="lbl">Tags: </label>
                <input type="text" id ="search-tag" placeholder="Search tags..."/>
            </div>
            <div id="Container">
                <label>
                    Noodles
                </label>
                <label>
                    Fish
                </label>
                <label>
                    Vegan
                </label>
            </div>	
        </div>
    );
}

export default SearhSortBar;