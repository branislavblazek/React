import React from 'react';

import './Hamburger.css';

const hamburger = (props) => {
    return (
        <div onClick={props.clicked} className="Hamburger">
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default hamburger;