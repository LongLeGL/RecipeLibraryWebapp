import './HomePage.css'
import React from 'react';
import { useState } from 'react';

function HomePage() {
	const username = sessionStorage.getItem('username');

	return (
		<div className="HomePage">	
			Home page's content		

		</div>
	);
}

export default HomePage;