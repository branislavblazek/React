import React from 'react';

import Hoc from '../Hoc.js';
import './Layout.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            showSideDrawer: false
        }
    }

    SideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    SideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true});
    }

    render ()
    {
        return (
            <Hoc>
                <Toolbar openHamburger={this.SideDrawerOpenHandler} />
                <SideDrawer 
                    closed={this.SideDrawerCloseHandler} 
                    open={this.state.showSideDrawer}
                />
                <div className="content">
                    {this.props.children}
                </div>
            </Hoc>
        )
    }
    
}

export default Layout;