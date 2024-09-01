import './HomePage.css'
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import SearhSortBar from '../../components/Inputs/SearchSortBar.js';
import ResultPage from '../Search/ResultPage.js'
import { useState } from 'react';
import { getRandomRecipe } from '../../firebase/database.js';
import ReactStars from "react-rating-stars-component";
import convertDateTime from '../../lib/convertDateTime.js';
import RecipeRecommendation from './RecipeRecommendation.js';

function HomePage() {
	const user = JSON.parse(localStorage.getItem('user'));
	const username = user ? user.name : null;

	const [searchResults, setResults] = useState([]);

	return (
		<div className="HomePage">
			<div className="NewRecipe">
        <Link to="/RecipeLibraryWebapp/CreateRecipe">
          <button className="CreateRecipeBtn" disabled={!username}>
            Create New Recipe
          </button>
        </Link>
      </div>
			<RecipeRecommendation/>
			{/* <SearhSortBar outputSetter={setResults} />
			<Routes>
				<Route path="/ResultPage" element={<ResultPage results={searchResults} />} />
				<Route path="/*" element={homePageDisplays}  />
			</Routes>			 */}

		</div>
	);
}

export default HomePage;