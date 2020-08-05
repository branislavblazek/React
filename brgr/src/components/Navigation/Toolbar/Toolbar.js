import React from 'react';

import './Toolbar.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Hamburger from './Hamburger/Hamburger';

const toolbar = (props) => (
    <header className="Toolbar">
        <Hamburger clicked={props.openHamburger} />
        <div className="Logo_toolbar">
            <Logo />
        </div>
        <nav className="DesktopOnly">
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;