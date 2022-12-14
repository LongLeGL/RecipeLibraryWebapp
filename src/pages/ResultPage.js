import './ResultPage.css'
import React from 'react';
import SearhSortBar from '../components/SearchSortBar';
import ResultItem from '../components/ResultItem';

function HomePage() {
	return (
		<div className = "ResultPage">
			<SearhSortBar/>
				
			<div className='ResultsContainer'>
				<ResultItem Name='Rice' Author='Chinqau' Link='/ViewRecipe' />
				<ResultItem Name='Spaghetti' Author='Antonio' Link='/ViewRecipe' />
				<ResultItem Name='Taco' Author='Joseh' Link='/ViewRecipe' />
				<ResultItem Name='Chicken' Author='Alice' Link='/ViewRecipe' />
				<ResultItem Name='Rosoto' Author='Rose' Link='/ViewRecipe' />
				<ResultItem Name='Cake' Author='Josh' Link='/ViewRecipe' />
			</div>
			
		</div>
	);
}

export default HomePage;