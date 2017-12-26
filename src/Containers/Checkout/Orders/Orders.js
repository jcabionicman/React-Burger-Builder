import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Order from '../../../Components/Order/Order';
import classes from './Orders.css';
import withErrors from '../../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {
    state = {
        ingredients: []
    }

    componentDidMount(){
        axios.get('https://react-my-burger-b4f53.firebaseio.com/orders.json')
            .then(resp => {

                const keys = Object.keys(resp.data);
                const data = [];
                for(let key of keys){
                    data.push({ ...resp.data[key].ingredients, key })
                }
                
                this.setState({ingredients: data});
            }).catch(error => {
                this.setState({error: true});
            })
    }

    listOrders = () => {
        return this.state.ingredients.map((order) => {
            return (
                <Order ingredients={order} key={order.key} />
            )
        })

    }

    render(){
        let orders = <h1>No Orders to List</h1>
        if(this.state.ingredients){
            orders = this.listOrders();
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrors(Orders, axios); 