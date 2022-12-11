import React from 'react';
import './UpperBar.css'
import { Link } from 'react-router-dom';

function UpperBar (props) {
	return (
		<div className='UpperBar'>
			<Link to="/">
				<button>Home</button>
			</Link>
			<Link to="/Login">
				<button>Login</button>
			</Link>
			<Link to="/ViewRecipe">
				View Recipe
			</Link>
			<Link to="/CreateRecipe">
				Create Recipe
			</Link>
		</div>
	);
}

export default UpperBar;