import axios from 'axios';
import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat:0
    },
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    let oldCount = 0;
    let upDatedCount = 0;
    let upDatedIngredients = null;
    let oldPrice = 0;
    let newPrice = 0;

    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            oldCount = state.ingredients[action.payload.ingredientType];
            upDatedCount = oldCount + 1;
            upDatedIngredients = {
                ...state.ingredients
            };

            upDatedIngredients[action.ingredientType] = upDatedCount;
            const priceAddition = action.payload.price;

            oldPrice = state.totalPrice;
            newPrice = oldPrice + priceAddition;
            return {
                ...state,
                totalPrice: newPrice,
                ingredients: upDatedIngredients
            }

        case actionTypes.GET_INGREDIENTS:
        console.log('Got to reducer ')        
            axios.get('https://react-my-burger-b4f53.firebaseio.com/ingredients.json')
                .then(resp => {
                    return {
                        ...state,
                        ingredients: resp.data
                    }
                }).catch(error => {
                    //this.setState({error: true});
                })
            break;

        case actionTypes.REMOVE_INGREDIENTS:

            oldCount = state.ingredients[action.payload.ingredientType];
            if(oldCount <=0){
                return;
            }

            upDatedCount = oldCount - 1;
            upDatedIngredients = {
                ...state.ingredients
            };

            upDatedIngredients[action.payload.ingredientType] = upDatedCount;
            const priceSubtraction = action.payload.price;
            oldPrice = state.totalPrice
            newPrice = oldPrice - priceSubtraction;
            return {
                ...state,
                totalPrice: newPrice,
                ingredients: upDatedIngredients
            }            

        default:
            return state;
    }

    return state;
}

export default reducer;