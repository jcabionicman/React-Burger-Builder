import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';

import Aux from '../../hoc/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actions';

import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import Spinner from '../../Components/UI/Spinner/Spinner';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state ={
        // ingredients: null,
        // totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://react-my-burger-b4f53.firebaseio.com/ingredients.json')
        //     .then(resp => {
        //         this.setState({ingredients: resp.data});
        //     }).catch(error => {
        //         this.setState({error: true});
        //     })
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    }).reduce((sum, el) =>{
                        return sum + el;
                    },0);
        this.setState({purchaseable: sum > 0});        
    }

    addIngredientHandler = (type) => {

        this.props.onAddIngredient(type, INGREDIENT_PRICES[type]);
        this.updatePurchaseState(this.ingredients);

        // const oldCount = this.state.ingredients[type];
        // const upDatedCount = oldCount + 1;
        // const upDatedIngredients = {
        //     ...this.state.ingredients
        // };

        // upDatedIngredients[type] = upDatedCount;
        // const priceAddition = INGREDIENT_PRICES[type];
        // // const oldPrice = this.state.totalPrice
        // const oldPrice = this.prsop.totalPrice;        
        // const newPrice = oldPrice + priceAddition;
        // this.setState({totalPrice: newPrice, ingredients: upDatedIngredients})
        // this.updatePurchaseState(upDatedIngredients);
    }

    removeIngredientHandler = (type) => {
        this.props.onRemoveIngredient(type, INGREDIENT_PRICES[type])
        this.updatePurchaseState(this.ingredients);

        // const oldCount = this.state.ingredients[type];
        // if(oldCount <=0){
        //     return;
        // }

        // const upDatedCount = oldCount - 1;
        // const upDatedIngredients = {
        //     ...this.state.ingredients
        // };

        // upDatedIngredients[type] = upDatedCount;
        // const priceSubtraction = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice
        // const newPrice = oldPrice - priceSubtraction;
        // this.setState({totalPrice: newPrice, ingredients: upDatedIngredients});
        // this.updatePurchaseState(upDatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {

        this.setState({loading: true});

            const queryParams = [];
            for(let i in this.state.ingredients){
                queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
            }
            queryParams.push('price=' + this.state.price);
            const queryString = queryParams.join('&');
            this.props.history.push({ 
                pathname: '/checkout', 
                search: queryString
            })
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] < 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients Cannot Be Loaded</p> : null;

        if(this.state.ingredients){
            orderSummary = (
                <OrderSummary ingredients={this.state.ingredients} 
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                price={this.state.totalPrice}/>
            );

            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded = {this.addIngredientHandler} 
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable = {this.state.purchaseable}
                        ordered={this.purchaseHandler}
                        />
                </Aux>
            );
        }

        if(this.state.loading){
            orderSummary = (
                <Spinner />
            )
        }

        if(!this.state.ingredients){
            burger = <Spinner />
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} 
                        modalClosed={this.purchaseCancelHandler} >

                {orderSummary}

                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientType, price) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            payload: {
                ingredientType, 
                price
            }
        }),

        onGetIngedients: () => dispatch => ({
            type: actionTypes.GET_INGREDIENTS
        }),

        onRemoveIngredient: (ingredientType, price) => dispatch({
            type: actionTypes.REMOVE_INGREDIENTS,
            payload: {
                ingredientType, 
                price                
            }
        })
                
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));