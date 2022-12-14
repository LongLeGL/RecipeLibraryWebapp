import './HomePage.css'
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
	return (
		<div class = "HomePage">
			<div class ="RealBox">
				<form action="" id="search-box">
					<input type="text" id ="search-text" placeholder="Search..."/>
					<button id="search-btn">Search</button>
				</form>
				
			</div>
			<div class ="FilterBox">
				<div id="Order">
					<label id="lbl">Order by:    </label>
					<input type="radio" id="time" name="sort"/> Time <input type="radio" id="rating" name="sort" /> Rating
				</div>
				<div id="SearchTag">
					<label id="lbl">Tags: </label>
					<input type="text" id ="search-tag" placeholder="Search tags..."/>
				</div>
				<div id="Container">
					<tag>
						
						Noodles
					</tag>
					<tag>
						Fish
					</tag>
					<tag>
						Vegan
					</tag>
				</div>
			</div>
			<div class="NewRecipe">
				<Link to= "/CreateRecipe">
					<button>Create New Recipe</button>
				</Link>
			</div>
			<div class="RecipeOfTheDay">
				<div id="RecipeOfTheDay-header">
					Recipe Of The Day
				</div>
				<div id="RecipeOfTheDay-panel">
					<recipeTitle>
						Homemade Fish
					</recipeTitle>
					<recipeTitle>
						Vegan Noodle
					</recipeTitle>
					<recipeTitle>
						Authentic Pho
					</recipeTitle>
				</div>
			</div>
			
		</div>
	);
}

export default HomePage;