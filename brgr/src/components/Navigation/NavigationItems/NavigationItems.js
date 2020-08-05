import React from 'react';

import './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>  
        {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {props.isAuth ? 
            <NavigationItem link="/logout">Logout</NavigationItem> :
            <NavigationItem link="/auth">Authenticate</NavigationItem> 
        } 
    </ul>
);

export default navigationItems;