import React from 'react';
import './UpperBar.css'
import { Link } from 'react-router-dom';
import HomeIcon from '../icons/home.svg'

function UpperBar (props) {
	return (
		<div className='UpperBar'>
			<Link to="/">
				<div className='UpperbarHomeButton'>
					<img src={HomeIcon} alt='upperbarHomeIcon' />
				</div>
			</Link>

			<div className='UpperBarTitle'>
				<img src='/logo.png' alt='upperbarLogo' />
				<h1>Cooking recipe library</h1>
			</div>

			<Link to="/ViewRecipe">
				View Recipe
			</Link>
			<Link to="/CreateRecipe">
				Create Recipe
			</Link>

			<Link to="/Login">
				<button>Login</button>
			</Link>
		</div>
	);
}

export default UpperBar;