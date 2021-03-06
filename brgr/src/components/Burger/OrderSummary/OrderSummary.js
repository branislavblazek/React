import React from 'react';

import Hoc from '../../../hoc/Hoc';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSumamry = Object.keys(props.ingredients).map(igKey => {
        return (<li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>);
    });
    return (
        <Hoc>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSumamry}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}$</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Hoc>
    );
}

export default OrderSummary;