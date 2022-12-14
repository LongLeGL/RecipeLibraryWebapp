import './HomePage.css'
import React from 'react';
import { Link } from 'react-router-dom';
import SearhSortBar from '../components/SearchSortBar';

function HomePage() {
	return (
		<div className = "HomePage">
			<SearhSortBar/>
				
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
			
		</div>
	);
}

export default HomePage;