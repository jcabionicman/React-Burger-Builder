import React, { Component} from 'react';
import { Route } from 'react-router-dom';

import CheckoutSUmmary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon:1
        }
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        for(let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];            
            }
        }

        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        return(
            <div>
                <CheckoutSUmmary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>
                    <Route path={this.props.match.path + '/contact-data'} 
                        render={(props) => (<ContactData ingredients={this.state.ingredients} {...props} />)} />
            </div>
        )
    }
}

export default Checkout;