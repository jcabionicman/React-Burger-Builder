import React from 'react';

import classes from './Order.css';

const order = (props) =>{
    const ings = [];
    for(let i in props.ingredients){
        if(i !== 'key'){
            ings.push({
                name: i,
                amount: props.ingredients[i]
            })
        }
    }

    const ingOutput = ings.map(i => {
        return <span>{i.name} ({i.amount})</span>; 
    });

    return(
    <div className={classes.Order}>
        <p>Ingredients: {ingOutput}</p>
        <p>Price: <strong>USD 5.45</strong></p>        
    </div>)
};

export default order; 


