import './HomePage.css'
import React from 'react';
import { Link, Routes , Route} from 'react-router-dom';
import SearhSortBar from '../components/SearchSortBar';
import ResultPage from './ResultPage.js'
import { useState } from 'react';
import { getRandomRecipe } from '../firebase/database';

function HomePage() {
	const username = sessionStorage.getItem('username');

	const getRecommendation = async () => {
		const result = await getRandomRecipe();
		return result;
	}
	const recommdedRecipe = getRecommendation();
	console.log(recommdedRecipe);

	const homePageDisplays = 
		<React.Fragment>
			<div className="NewRecipe">
				<Link to= "/CreateRecipe">
					<button className='CreateRecipeBtn' disabled={!username}>Create New Recipe</button>
				</Link>
			</div>
			<div className="RecipeOfTheDay">
				<div id="RecipeOfTheDay-header">
					Recipe Of The Day
				</div>
				<div id="RecipeOfTheDay-panel">
					<Link to= "/ViewRecipe">
						<h1>{recommdedRecipe.name}</h1><br/>
						<p>By {recommdedRecipe.username}</p>
					</Link>
				</div>
			</div>
		</React.Fragment>

		const [searchResults, setResults] = useState([]);
		
	return (
		<div className = "HomePage">
			<SearhSortBar outputSetter={setResults} />
			<Routes>
				<Route path="/ResultPage" element={<ResultPage results={searchResults} />} exact='True' />
				<Route path="/" exact='True' element={homePageDisplays}  />
			</Routes>			
		</div>
	);
}

export default HomePage;