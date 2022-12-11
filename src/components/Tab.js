import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Tab extends Component {
	onClick = () => {
		const { label, onClick } = this.props;
		onClick(label);
	}

	render() {
		const {
			onClick,
			props: {
				activeTab,
				label,
				path,
				icon
			},
		} = this;

		let className = 'tab-list-item';

		if (activeTab === label) {
			className += ' tab-list-active';
		}

		return (
			<Link to={path}>
			<div
				className={className}
				onClick={onClick}
			>
				<img src={icon} alt={path}/>
				{label}
			</div>
			</Link>
		);
	}
}
  
export default Tab;