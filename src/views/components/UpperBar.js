import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'

import './UpperBar.css'

import SearchBar from './SearchBar';

function UpperBar (props) {
	const username = sessionStorage.getItem('username');
	const navigate = useNavigate()
	function onclUpperBarUserBtn (){
		if (username){
			sessionStorage.setItem('username', '');
			window.location.href = '/RecipeLibraryWebapp';
		}
		else navigate('Login')
	}

	const [searchResults, setResults] = useState([]);

	return (
		<div className='UpperBar'>
			<div id='upperControlsBar'>
				<Link to="">
					<div className='UpperbarHomeButton'>
						<div id='upBar_Logo'>
							<div id='logoRedCircle'>
								<div id='logoNumber'>2</div>
							</div>
							<div id='logoText'>hand</div>
						</div>
					</div>
				</Link>

				<SearchBar outputSetter={setResults} />

				<div className='upperBarBtns'>
					<button id="cartBtn" onClick={null}><FontAwesomeIcon icon={faShoppingCart} /></button>
					<button className='BarLoginButton' onClick={onclUpperBarUserBtn}><FontAwesomeIcon icon={faUser} />{(username) ? username: 'Login'}</button>
				</div>
			</div>

			<div id='navBar'>
				<Link to=''>Home</Link>
				<Link to=''>Shop</Link>
				<Link to=''>Blog</Link>
				<Link to=''>Contacts</Link>
				<Link to=''>About Us</Link>
			</div>


		</div>
	);
}

export default UpperBar;