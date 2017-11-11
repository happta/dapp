import React, { Component } from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import App from './App/App';

class AppRouter extends Component {
  render() {
    return (
      <div className="container-scroller">
        <BrowserRouter>
          <Switch>
            <Redirect from="/" exact to="/mainnet" />
            <Route path="/:network/:resource?" component={App} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default AppRouter;
