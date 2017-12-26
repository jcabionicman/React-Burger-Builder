import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.css';

class modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render() {
        return (
        
        <Aux>
            <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)':'translateN(-100vh)',
                    opacity: this.props.show ? '1':'0'
                }}>
                {this.props.children}
            </div>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        </Aux>
        )
    }
}

export default modal;