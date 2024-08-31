import './HomePage.css'
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import SearhSortBar from '../../components/Inputs/SearchSortBar.js';
import ResultPage from '../Search/ResultPage.js'
import { useState } from 'react';
import { getRandomRecipe } from '../../firebase/database.js';
import ReactStars from "react-rating-stars-component";

function HomePage() {
	const user = JSON.parse(localStorage.getItem('user'));
	const username = user ? user.name : null;
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

	function getDateTime(UNIX_timestamp){
		var a = new Date(UNIX_timestamp);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
		return time;
	}

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
					<Link to= {`ViewRecipe/${recommdedRecipeState.name}/${recommdedRecipeState.username}`}>
						<h1>{recommdedRecipeState.name}</h1><br/>
						<p>By {recommdedRecipeState.username}</p>
						<div style ={{display: 'flex', alignitem:'center', paddingTop:'0.5em', paddingBottom:'0.3em'}} >
							<p>Rating: {recommdedRecipeState.rating?.toFixed(1)} </p>
							<ReactStars count={1} size={15} color="#ffd700" className='ResultRateStars' />
						</div>
						<span className='CreatedTimeDisplay'>{getDateTime(recommdedRecipeState.createdTime)}</span>
					</Link>
				</div>
			</div>
		</React.Fragment>

	const [searchResults, setResults] = useState([]);

	return (
		<div className="HomePage">
			<SearhSortBar outputSetter={setResults} />
			<Routes>
				<Route path="/ResultPage" element={<ResultPage results={searchResults} />} />
				<Route path="/*" element={homePageDisplays}  />
			</Routes>			

		</div>
	);
}

export default HomePage;