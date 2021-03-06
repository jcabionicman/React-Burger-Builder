import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Checkout/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" component={Orders} />            
            <Route path="/checkout" component={Checkout} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
