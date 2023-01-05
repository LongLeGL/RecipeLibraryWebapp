import './ResultPage.css'
import React from 'react';
import {Link} from 'react-router-dom';
// import SearhSortBar from '../components/SearchSortBar';
import ReactStars from "react-rating-stars-component";

function ResultPage({results}) {
	console.log(results);

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
								<div style ={{display: 'flex', alignitem:'center', paddingTop:'0.5em', paddingBottom:'0.3em'}} >
									<p>Rating: {item.rating?.toFixed(1)} </p>
									<ReactStars count={1} size={15} color="#ffd700" className='ResultRateStars' />
								</div>
								<span className='CreatedTimeDisplay'>{getDateTime(item.createdTime)}</span>
							</Link>
						</div>))}
				</div>
				
			</div>
			
		</div>
	);
}

export default ResultPage;