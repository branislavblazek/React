import React from 'react';
import {connect} from 'react-redux';

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
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    openHamburger={this.SideDrawerOpenHandler} />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);