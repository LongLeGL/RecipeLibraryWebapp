import './HomePage.css'
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import SearhSortBar from '../components/SearchSortBar';
import ResultPage from './ResultPage.js'
import { useState } from 'react';
import { getRandomRecipe } from '../firebase/database';

function HomePage() {
	const username = sessionStorage.getItem('username');
	const [recommdedRecipeState, setrecommdedRecipeState] = useState({});

	const getRecommendation = async () => {
		const result = await getRandomRecipe();
		return result;
	}
	// var recommdedRecipe2;
	var recommdedRecipe = {};
	getRecommendation().then(result => {
		if (!recommdedRecipeState.name) {
			recommdedRecipe = result;
			console.log(recommdedRecipe.name);
			setrecommdedRecipeState(recommdedRecipe);
		}
	});

	const homePageDisplays =
		<React.Fragment>
			<div className="NewRecipe">

				<Link to= "/RecipeLibraryWebapp/CreateRecipe">
					<button className='CreateRecipeBtn' disabled={!username}>Create New Recipe</button>
				</Link>
			</div>
			<div className="RecipeOfTheDay">
				<div id="RecipeOfTheDay-header">
					Recipe recommendation
				</div>
				<div id="RecipeOfTheDay-panel">
					<Link to= {`/RecipeLibraryWebapp/ViewRecipe/${recommdedRecipeState.name}/${recommdedRecipeState.username}`}>
						<h1>{recommdedRecipeState.name}</h1><br/>
						<p>By {recommdedRecipeState.username}</p>
					</Link>
				</div>
			</div>
		</React.Fragment>

	const [searchResults, setResults] = useState([]);

	return (
		<div className="HomePage">
			<SearhSortBar outputSetter={setResults} />
			<Routes>
				<Route path="/ResultPage" element={<ResultPage results={searchResults} />} exact='True' />
				<Route path="/" exact='True' element={homePageDisplays}  />
			</Routes>			

		</div>
	);
}

export default HomePage;