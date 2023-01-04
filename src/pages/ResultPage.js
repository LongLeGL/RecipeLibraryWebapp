import './ResultPage.css'
import React from 'react';
// import SearhSortBar from '../components/SearchSortBar';
import ResultItem from '../components/ResultItem';

function HomePage({results}) {
	console.log(results);
	
	return (
		<div className = "ResultPage">
			<div className='ResultsContainer'>
				<ResultItem Name='Rice' Author='Chinqau' Link='/RecipeLibraryWebapp/ViewRecipe' />
				<ResultItem Name='Spaghetti' Author='Antonio' Link='/RecipeLibraryWebapp/ViewRecipe' />
				<ResultItem Name='Taco' Author='Joseh' Link='/RecipeLibraryWebapp/ViewRecipe' />
				<ResultItem Name='Chicken' Author='Alice' Link='/RecipeLibraryWebapp/ViewRecipe' />
				<ResultItem Name='Rosoto' Author='Rose' Link='/RecipeLibraryWebapp/ViewRecipe' />
				<ResultItem Name='Cake' Author='Josh' Link='/RecipeLibraryWebapp/ViewRecipe' />
			</div>
			
		</div>
	);
}

export default HomePage;