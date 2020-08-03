import React from 'react';

import BurgerLogo from '../../assets/images/burger-logo.png';
import './Logo.scss';

const logo = (props) => (
    <div className="Logo">
        <img src={BurgerLogo} alt="My burger" />
    </div>
);

export default logo;