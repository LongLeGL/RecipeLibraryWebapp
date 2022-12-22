import './HomePage.css'
import React from 'react';
import { Link, Routes , Route} from 'react-router-dom';
import SearhSortBar from '../components/SearchSortBar';
import ResultPage from './ResultPage.js'

function HomePage() {
	const homePageDisplays = 
		<React.Fragment>
			<div className="NewRecipe">
				<Link to= "/CreateRecipe">
					<button>Create New Recipe</button>
				</Link>
			</div>
			<div className="RecipeOfTheDay">
				<div id="RecipeOfTheDay-header">
					Recipe Of The Day
				</div>
				<div id="RecipeOfTheDay-panel">
					<Link to= "/ViewRecipe">
						<h1>Recipe name</h1><br/>
						<p>By Author</p>
					</Link>
				</div>
			</div>
		</React.Fragment>
	return (
		<div className = "HomePage">
			<SearhSortBar/>
			<Routes>
				<Route path="/ResultPage" element={<ResultPage/>} exact='True' />
				<Route path="/" exact='True' element={homePageDisplays}  />
			</Routes>			
		</div>
	);
}

export default HomePage;