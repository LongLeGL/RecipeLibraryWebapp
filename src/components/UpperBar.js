import React from 'react';
import './UpperBar.css'
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '../icons/home.svg'
import Tooltip from "@mui/material/Tooltip";

function UpperBar (props) {
	const username = sessionStorage.getItem('username');
	const navigate = useNavigate()
	function onclUpperBarUserBtn (){
		if (username){
			sessionStorage.setItem('username', '');
			window.location.href = '/';
		}
		else navigate('/Login')
	}

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

			<Tooltip
				title={(username) ? 'Logout': 'Login to your account'}
				leaveDelay={500}
			>
			<button className='BarLoginButton' onClick={onclUpperBarUserBtn}>{(username) ? username: 'Login'}</button>
			</Tooltip>
		</div>
	);
}

export default UpperBar;