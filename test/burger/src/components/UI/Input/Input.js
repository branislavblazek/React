import React from 'react';
import './Input.scss';

const input = (props) => {
    let inputElement = null;
    const InputClasses = ['InputElement'];

    if (props.invalid && props.shouldValidate && props.touched)
    {
        InputClasses.push("Invalid");
    }

    switch(props.elementtype)
    {
        case ('input'):
            inputElement = <input 
                className={InputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = (<textarea 
                className={InputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} ></textarea>);
            break;
        case ('select'):
            inputElement = (<select 
                className={InputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
                </select>);
            break;
        default:
            inputElement = <input 
                className="InputElement"
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />;
    }
    return(
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>);
}

export default input;