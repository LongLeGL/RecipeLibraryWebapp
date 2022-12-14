import React from 'react';
import './ResultItem.css';
import {Link} from 'react-router-dom';

function ResultItem(props) {
    return (  
        <div className='ResultItem'>

            <Link to={props.Link}>
                <h1>{props.Name}</h1>
                <p>{props.Author}</p>
            </Link>
        </div>
    );
}

export default ResultItem;