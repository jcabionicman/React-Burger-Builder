import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.inputElement]

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType){
        case ('textarea'):
            inputElement = <textarea 
                {...props.elementConfig}
                className={inputClasses.join(' ')} 
                onChange={props.changed} 
                value={props.value}
                />
        break;

        case ('select'):
            inputElement = (
                <select 
                    value={props.value}
                    onChange={props.changed} 
                    className={inputClasses.join(' ')}>
                    {props.elementConfig.options.map(opt => {
                        return <option key={opt.value} value={opt.value}>
                        {opt.displayValue}</option>
                    })}
                </select>
            )
        break;

        case ('input'):        
        default:
            inputElement = <input 
                {...props.elementConfig}
                className={inputClasses.join(' ')} 
                onChange={props.changed} 
                value={props.value} />
            break;        
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;