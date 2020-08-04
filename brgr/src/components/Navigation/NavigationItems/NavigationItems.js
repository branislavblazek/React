import React from 'react';

import './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>  
        <NavigationItem link="/orders">Orders</NavigationItem>  
        <NavigationItem link="/auth">Authenticate</NavigationItem>  
    </ul>
);

export default navigationItems;