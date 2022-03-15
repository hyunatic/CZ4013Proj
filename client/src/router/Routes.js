import React from 'react';
import { Route, Switch } from 'react-router-dom';


import Home from '../pages/Home';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Transfer from '../pages/Transfer';

import Deposit from '../pages/Deposit';

class Routes extends React.Component {
  /**
   * Routes
   * @returns the path of each route
   */
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/home' component={Home} />
        <Route path='/transfer' component={Transfer} />
        <Route path='/logout' component={Logout} />
        

        <Route path= '/deposit' component={Deposit} />


        <Route render={() => <h1>Not Found</h1>} />
      </Switch>
    );
  }
}

export default Routes;