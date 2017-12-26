import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
]

const buildControls = (props) => {
    return(
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>    
        {
            controls.map(bc => {
                return <BuildControl 
                    key={bc.label} 
                    label={bc.label} 
                    type={bc.type} 
                    added={() => props.ingredientAdded(bc.type)}
                    removed={() => props.ingredientRemoved(bc.type)}
                    disabled={props.disabled[bc.type]} />
            })
        }


        <button 
            className={classes.OrderButton} 
            disabled={!props.purchaseable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
    );
}

export default buildControls;