import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toobar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {

        this.setState(prev => {
            return { showSideDrawer: !prev.showSideDrawer }
        });
    }

    render(){
        return(
            <Aux>
            <Toolbar drawerToggleClick={ this.sideDrawerToggleHandler } open={this.state.showSideDrawer} />
            <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
}

export default Layout;

