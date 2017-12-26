import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../Components/UI/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Postal Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLenth: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'}                        
                    ]
                },
                value:'',
                validation: {},
                valid:true
            }
        },
        loading: false,
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

         const order = {
            ingredients: this.props.ingredients, 
            price: this.props.price, 
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
        
    }

    checkValidity = (value, rules) => {
        let isValid = false;

        if(rules.required) {
            isValid = value.trim() !== '';
        }

        if(rules.minLenth) {
            isValid = value.length >= rules.minLenth
        }

        return isValid;
    }

    handleInputChanged = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, 
                updatedFormElement.validation);
        updatedFormElement.touched = true;        

        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = false;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm : updatedOrderForm, formIsValid : formIsValid});
    }

    render() {

        const keys = Object.keys(this.state.orderForm);
        let form = (
            <form onSubmit={this.orderHandler}>
                {keys.map((field, index) => {
                    return (<Input key={index}
                                    changed={(event) => this.handleInputChanged(event, field)} 
                                    value={this.state.orderForm[field].value}
                                    elementType={this.state.orderForm[field].elementType} 
                                    elementConfig={this.state.orderForm[field].elementConfig}
                                    invalid={!this.state.orderForm[field].valid}
                                    shouldValidate={this.state.orderForm[field].validation}
                                    touched={this.state.orderForm[field].touched} />)
                })}
                <Button 
                    btnType="Success"
                    disabled={!this.state.orderForm.formIsValid}>ORDER</Button>                
            </form>
        )
        
        if(this.state.loading){
            form = (<Spinner />)
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;