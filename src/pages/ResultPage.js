import './ResultPage.css'
import React from 'react';
import {Link} from 'react-router-dom';
// import SearhSortBar from '../components/SearchSortBar';
import ResultItem from '../components/ResultItem';
import ReactStars from "react-rating-stars-component";
import { ratingClasses } from '@mui/material';

function HomePage({results}) {
	console.log(results);
	
	return (
		<div className = "ResultPage">
			<div className='ResultsContainer'>
				{(!results[0]) ? <div className="NoResultFound">No results found</div> : null}
				{/* display result here */}
				<div className="ResultListItem">
					{results.map((item) => (
						<div  className="Item">
							<Link to= {`/ViewRecipe/${item.name}/${item.username}`}>
								<h1>{item.name}</h1><br/>
								<p>By: {item.username}</p>
								<div style ={{display: 'flex', alignitem:'center'}} >
									<p>Rating: {item.rating} </p>
									<ReactStars count={1} size={15} color="#ffd700" className='ResultRateStars' />
								</div>
							</Link>
						</div>))}
				</div>
				
			</div>
			
		</div>
	);
}

export default HomePage;